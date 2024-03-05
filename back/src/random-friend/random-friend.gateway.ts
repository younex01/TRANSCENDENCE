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
  private id: number = -1;
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
      const token:any = socket.handshake.query.token;
      // const user = this.gameService.getUserInfosFromToken(token);
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
      //update the status to in game for player2
      let newBall:Ball = {...this.ball};
      this.rooms[availibleRoomId].push(socket.id);
      socket.join(availibleRoomId);
      // console.log(`join this room ${availibleRoomId}`);
      this.server.to(availibleRoomId).emit("start");
      //
      this.id = this.game.length;
      if (this.players[this.id] && this.players[this.id].length == 1)
        this.players[this.id].push({id: socket.id, playerNb: 2, x: 880, y: 175 ,score:0, width: 20, height: 100,name:"player2",giveUp: false,db_id: "",pic: "",g_id: ""});
      // console.log("------------players-Data-------------",this.id);
      // console.log(this.players);
      const newGame: Game = {
        nb: this.id,
        ball: newBall,
        players: this.players[this.id],
        rooms: this.rooms
      };
      this.game.push(newGame);

      this.rooms = Object.fromEntries(
        Object.entries(this.rooms)
          .filter(([roomId, players]) => !players.includes(socket.id))
      );
      // console.log("------------Game-Data-------------");
      // console.log(this.game)
      // console.log("------------rooms-Data-------------");
      // console.log(this.rooms)
      // this.players = {};
      // this.rooms = {};
      // const roomId = Object.keys(this.rooms);
      // const index = Object.keys(this.rooms).findIndex(roomId => roomId === roomId[0]);
      // if (index !== -1) {
      //   delete this.rooms[roomId[index]];
      // }
      this.gameService.startTheGame(this.game[this.id].players, this.game[this.id].rooms, availibleRoomId, this.server, this.game[this.id].ball, this.canvas);
    }
    else
    {
      //update the status to in game for player1
      this.id++;
      const newRoomId = socket.id;
      this.rooms[newRoomId] = [socket.id];
      socket.join(newRoomId);
      // console.log("new room created!!");
      // console.log(this.rooms);
      if (!this.players[this.id]) {
        this.players[this.id] = [];
      }
      if (this.players[this.id].length == 0)
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
    //update the status to offline "ïn game ststus"
    //send emit message to the winner if the game still work
    // pop the client from the room list
    // leave the client id from the 
    // console.log("before---game");
    // console.log(this.game);
    this.connectedUsers.delete(client.id);
    // console.log("----------Player");
    // console.log(this.players);
    this.players = this.gameService.deletePlayerFromPlayers(this.players, client.id);
    // console.log("------------Rooms-Data-------------");
    // console.log(this.rooms);
    // if(this.rooms && this.game.length == 0 && this.id == 0)
    // {
    //   const index = Object.keys(this.rooms);
    //   if(this.rooms[index[0]][0] == client.id)
    //     this.id -= 1;
    // }
    this.rooms = Object.fromEntries(
      Object.entries(this.rooms)
        .filter(([roomId, players]) => !players.includes(client.id))
    );
    this.id = this.gameService.removeDataFromRooms(this.game, client.id,this.id,this.server);
    // console.log("handle disconnect",this.id);
    // console.log(this.players);
    // console.log("after---game");
    // console.log(this.game);
    // this.players = {};
    // this.rooms = {};
    // console.log("------------Game-Data-------------");
    // console.log(this.game);
    // console.log("------------rooms-Data-------------");
    // console.log(this.rooms);
    // console.log("------------Players-Data-------------");
    // console.log(this.players);
    // console.log(this.id);
  }
}
