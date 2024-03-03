import { SubscribeMessage, WebSocketGateway, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, WsException} from '@nestjs/websockets';
import { Socket, Server} from 'socket.io';
import { UserService } from './user.service';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway(
  {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  }
)

export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private UserService: UserService, private jwt: JwtService) {}
  @WebSocketServer()
  server: Server;

  // async afterInit(client: Socket) {
  //   client.use(async (request: any, next) => {
  //     const token = request.handshake.auth.jwt_token ?? request.handshake.headers.jwt_token;
  //     try {
  //       const payload = await this.jwt.verify(token, {
  //         secret: 'dontTellAnyone'
  //       })
  //     }
  //     catch (error) {
  //       // throw new WsException('Invalid Token');
  //     }
  //     next()
  //   })
  // }

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

  @OnEvent('refreshStatus')
  async refreshStatus(client: Socket) {
    this.server.emit("refreshStatus");
  }

  @SubscribeMessage('acceptRequest')
  async acceptRequest(client: Socket, payload:any) {

  }

  @SubscribeMessage('declineRequest')
  async declineRequest(client: Socket, payload:any) {

  }



  handleConnection(client: any) {
    try {
        const token = client.handshake.auth.jwt_token ?? client.handshake.headers.jwt_token;
        const payload = this.jwt.verify(token, {
            secret: 'dontTellAnyone'
        });
        const userId = payload.sub;
        client.userId = userId;
        this.UserService.addUserSocket(userId, client);
    } catch (error) {
        console.log('Error handling connection:', error.message);
        client.disconnect(true);
    }
}

  handleDisconnect(client: any) {
    console.log("user disconnected")
    this.UserService.removeUserSocket(client.userId, client);
  }
}

