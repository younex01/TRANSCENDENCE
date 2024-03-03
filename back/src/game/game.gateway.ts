import { SubscribeMessage, WebSocketGateway, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { GameService } from './game.service';

@WebSocketGateway(
  {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  }
)

export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private gameServie: GameService) { }
  @WebSocketServer()
  server: Server;


  @OnEvent('refreshNotifications')
  async refreshNotifications(client: Socket, payload:any) {
    this.server.emit("refreshFrontNotifications");
  } 





















































  handleConnection(client: any) {
    console.log("chat connected")
  }

  handleDisconnect(client: any) {
    console.log("chat disconnected")
  }

}
