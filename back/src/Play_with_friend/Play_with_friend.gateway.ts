import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket , Server} from 'socket.io';
import { Ball, Canvas, Game, Player } from './game-data.interface';
import { GameService } from './Play_with_friend.service';


@WebSocketGateway(3002, {cors: '*'})
export class PlayFriendGateway implements OnGatewayDisconnect {

  constructor(private readonly gameService: GameService) {};

  @WebSocketServer()
  server: Server;

  private game : Game [] = [];
  private id: number = 0;
  private rooms: {[roomId:string]: string[]} = {};
  private ball : Ball = {color: "WHITE",radius: 15,speed: 0.9,velocityX: 5,velocityY: 5,x: 450,y: 225}
  private canvas: Canvas = {height: 0,width:0};
  private players: Player[]= [];
  private ids:string[] = [];

  private opponents:string[] = [];
  private connectedUsers = new Map<string, any>();
  private  acc_rqst: Map<string, string> = new Map();

  //to do
  // fix play again

  @SubscribeMessage('connecte')
  async handleConnection(socket: Socket): Promise<void> {
    
    //check if the user is in the game 
    const token:any = socket.handshake.query.token;
    if (token === "token")
      return;
    const senderId:any = socket.handshake.query.id;
    // this.gameService.test2(this.game, senderId)
    // .then((result) => {
    //   console.log("Index found:", result);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
    // console.log(socket.handshake.query.id);
    // console.log(this.ids);
    const token_id = this.gameService.getUserInfosFromToken(token);
    // const user = this.gameService.getUserInfosFromToken(token);
    const existingUser = Array.from(this.connectedUsers.values());
    if (existingUser.includes(token_id.sub)) {
      // console.log(`Token ${token_id.sub} already connected with another client`);
      socket.emit("already_in_game");
      socket.disconnect();
      return;
    }
    
    this.connectedUsers.set(socket.id, token_id.sub);
    
    
    const index: any = this.gameService.findIndexBySenderId(this.game,senderId,this.acc_rqst);
    // console.log(index);
    //check if there's a room waiting for senderId to join by data base of invit to play 
    //update the opponent

    if (index != -1)
    {
      //update status to in game for player2
      const availibleRoomId = Object.keys(this.game[index].rooms).find(roomId => this.game[index].rooms[roomId].length == 1);
      if(!availibleRoomId) return;
      this.game[index].rooms[availibleRoomId].push(socket.id);
      socket.join(availibleRoomId);
      // console.log(`join this room ${availibleRoomId}`);
      this.server.to(availibleRoomId).emit("start");
      this.game[index].players.push({id: socket.id, playerNb: 2, x: 880, y: 175 ,score:0, width: 20, height: 100,name:"player2",giveUp: false,db_id: "",pic: "",g_id: "",opponent_id:""});
      // console.log(this.game[index].players);
      
      this.gameService.handle_id(senderId,"", socket.id,this.game);
      this.gameService.removeInviteToPlay(this.game[index].players);
      this.game[index].players[0].db_id = senderId;
      this.gameService.startTheGame(this.game[index].players, this.game[index].rooms, availibleRoomId, this.server, this.game[index].ball, this.canvas);
    }
    else
    {
      //update status to in game for player1
      const newRoomId = socket.id;
      this.rooms[newRoomId] = [socket.id];
      socket.join(newRoomId);
      // console.log("new room created!!");
      // console.log(newRoomId);
      
      this.gameService.getReceiverIdBySenderId(senderId,this.players,this.opponents);
      this.players.push({id: newRoomId, playerNb: 1, x:0, y: 175,score: 0,width: 20, height: 100,name: "player1",giveUp:false,db_id: senderId,pic: "", g_id: "",opponent_id:""});
      let newBall:Ball = {...this.ball};
      const newGame: Game = {
        nb: this.id,
        ball: newBall,
        players: [],
        rooms: this.rooms,
      };
      newGame.players.push(this.players[0]);
      this.game.push(newGame);
      // console.log("---------------------<");
      // console.log(newGame);
      // console.log(newGame.players);
      this.players = [];
      this.rooms = {};
      this.id++;
      this.gameService.handle_id(senderId,"", socket.id,this.game);
      // console.log("send.id",senderId);
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


  @SubscribeMessage('user_id')
  async handle_id(@MessageBody() id: string , @ConnectedSocket() client: Socket) : Promise<void>
  {
    const g_id:string = ""; //to remove
    this.gameService.handle_id(id,g_id, client.id,this.game);
  }

  @SubscribeMessage('accepted_request')
  handle_request(@MessageBody() data: { key: string, value: string } , @ConnectedSocket() client: Socket) : void
  {
    // console.log(data.key,data.value);
    this.acc_rqst.set(data.key,data.value);
    // console.log(this.acc_rqst);
    // console.log("received request");
    client.disconnect();
  }



  handleDisconnect(client: Socket) {
    //send emit message to the winner if the game still work
    // pop the client from the room list
    // leave the client id from the 
    //Update the status of the player to offline "status in game"
    this.connectedUsers.delete(client.id);
    console.log("handle disconnect");
    // console.log("------------Game-Data-------------");
    // console.log(this.game);
    this.id = this.gameService.removeDataFromRooms(this.game, client.id,this.id,this.server);
    this.players = [];
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

