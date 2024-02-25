import { SubscribeMessage, WebSocketGateway, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer} from '@nestjs/websockets';
import { Socket, Server} from 'socket.io';
import { UserService } from './user.service';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway(
  {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  }
)

export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private UserService: UserService) {}
  @WebSocketServer()
  server: Server;
  

  @OnEvent('refreshNotifications')
  async refreshNotifications(client: Socket, payload:any) {
    this.server.emit("refreshFrontNotifications");

  } 
  @OnEvent('refreshfriendShip')
  async refreshfriendShip(client: Socket, payload:any) {
    this.server.emit("refreshFrontfriendShip");
    this.server.emit("refresh");

  }

  @OnEvent('refreshChat')
  async refreshChat(client: Socket, payload:any) {
    this.server.emit("refreshChatFront");

  }



  @SubscribeMessage('acceptRequest')
  async acceptRequest(client: Socket, payload:any) {

  }

  @SubscribeMessage('declineRequest')
  async declineRequest(client: Socket, payload:any) {

  }



  handleConnection(client: any) {
    console.log("user connected")
  }

  handleDisconnect(client: any) {
    console.log("user disconnected")
  }

}

