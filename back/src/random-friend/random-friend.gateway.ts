import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket , Server} from 'socket.io';
import { Ball, Canvas, Game, Player } from './game-data.interface';
import { GameService } from './random-friend.service';

@WebSocketGateway(3001, {cors: '*'})
export class RandomFriendGateway implements OnGatewayDisconnect {

  constructor(private readonly gameService: GameService) {};

  @WebSocketServer()
  server: Server;

  private game : Game [] = [];
  private id: number = 0;
  private rooms: {[roomId:string]: string[]} = {};
  private ball : Ball = {color: "WHITE",radius: 15,speed: 0.9,velocityX: 5,velocityY: 5,x: 450,y: 225}
  private canvas: Canvas = {height: 0,width:0};
  private players: {[id:number]: Player[]} = {};
  private ids:string[] = [];

  private readonly connectedUsers = new Map<string, any>();


  //to do
  // fix play again

  @SubscribeMessage('connecte')
  async handleConnection(@MessageBody() socket: Socket): Promise<void> {
    // this.connectedUsers[socket.id] = socket;
    const availibleRoomId = Object.keys(this.rooms).find(roomId => this.rooms[roomId].length == 1);

    //check if the user is in the game 
      // 'token' is sent from the client when it connects
      const token = socket.handshake.query.token;
      const existingUser = Array.from(this.connectedUsers.values());
      if (existingUser.includes(token)) {
        console.log(`Token ${token} already connected with another client`);
        socket.emit("already_in_game");
        socket.disconnect();
        return;
      }
      this.connectedUsers.set(socket.id, token);
      // console.log('Token received:', token);
      // console.log('socket',socket.id);
      // console.log(this.connectedUsers);
      // console.log(existingUser);


      // Your logic here
    // console.log("----->token:",token);

    if (availibleRoomId)
    {
      let newBall:Ball = {...this.ball};
      this.rooms[availibleRoomId].push(socket.id);
      socket.join(availibleRoomId);
      console.log(`join this room ${availibleRoomId}`);
      this.server.to(availibleRoomId).emit("start");
      if(socket.id === this.players[this.id][0].id)
        return;
      this.players[this.id].push({id: socket.id, playerNb: 2, x: 880, y: 175 ,score:0, width: 20, height: 100,name:"player2",giveUp: false,db_id: "",pic: "",g_id: ""});
      // console.log("------------players-Data-------------");
      // console.log(this.players);
      const newGame: Game = {
        nb: this.id,
        ball: newBall,
        players: this.players[this.id],
        rooms: this.rooms
        };
      // console.log("------------Game-Data-------------");
      // console.log(newGame)
      this.game.push(newGame);
      this.players = {};
      this.rooms = {};
      this.gameService.startTheGame(this.game[this.id].players, this.game[this.id].rooms, availibleRoomId, this.server, this.game[this.id].ball, this.canvas);
      this.id++;
    }
    else
    {
      const newRoomId = socket.id;
      this.rooms[newRoomId] = [socket.id];
      socket.join(newRoomId);
      console.log("new room created!!");
      console.log(newRoomId);
      if (!this.players[this.id]) {
        this.players[this.id] = [];
      }
      this.players[this.id].push({id: socket.id, playerNb: 1, x:0, y: 175,score: 0,width: 20, height: 100,name: "player1",giveUp:false,db_id: "",pic: "", g_id: ""});
    }
  }

  @SubscribeMessage('canvas_data')
  handleEvent(
    @MessageBody() data: Canvas,
    @ConnectedSocket() client: Socket,
  ): void {
    this.canvas.height = data.height;
    this.canvas.width = data.width;
  }

  @SubscribeMessage('arrow_move')
  handleArrowMove(@MessageBody() data: string, @ConnectedSocket() socket: Socket): void {
    const id: number = this.gameService.findNbById(this.game, socket.id);
    this.gameService.handleArrowMove(data, socket.id, this.game[id].players);
  }
  
  @SubscribeMessage('mouse_move')
  handleMouseMove(@MessageBody() data: number, @ConnectedSocket() socket: Socket): void {
    const id: number = this.gameService.findNbById(this.game, socket.id);
    this.gameService.handleMouseMove(data, socket.id, this.game[id].players);
  }

  @SubscribeMessage('play_again')
  async PlayAgain(@MessageBody() data: number, @ConnectedSocket() socket: Socket): Promise<void> {
    this.gameService.resetBall(this.ball, this.canvas);
    this.gameService.ResetScore(this.players[this.id]);
  }

  @SubscribeMessage('user_id')
  async handle_id(@MessageBody() id: string , @ConnectedSocket() client: Socket) : Promise<void>
  {
    const g_id:string = ""; //to remove
    this.gameService.handle_id(id,g_id, client.id,this.game);
  }



  handleDisconnect(client: Socket) {
    //send emit message to the winner if the game still work
    // pop the client from the room list
    // leave the client id from the 
    this.connectedUsers.delete(client.id);
    console.log("handle disconnect",client.id);
    console.log("------------Game-Data-------------");
    console.log(this.game);
    this.id = this.gameService.removeDataFromRooms(this.game, client.id,this.id,this.server);
    this.players = {};
    this.rooms = {};
    // console.log("------------Game-Data-------------");
    // console.log(this.game);
    // console.log("------------rooms-Data-------------");
    // console.log(this.rooms);
    // console.log("------------Players-Data-------------");
    // console.log(this.players);
    // console.log(this.id);
  }
}
