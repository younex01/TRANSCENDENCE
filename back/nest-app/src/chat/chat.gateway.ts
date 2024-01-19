import { SubscribeMessage, WebSocketGateway, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server} from 'socket.io';
import { PrismaService } from 'src/prisma.service';

@WebSocketGateway(
  {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  }
)

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private prisma: PrismaService) {}
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, payload:any) {
    console.log(payload);
    client.broadcast.emit('send-back',payload);
  }

  @SubscribeMessage('createGroupChat')
  async handleCreateGroupChat(client: Socket, payload:any) {
    console.log(payload);
    const createdChatGroup = await this.prisma.chatGroup.create({
      data: {
        name: payload.name,
        avatar: payload.avatar,
        status: payload.status
      }
    })
    this.server.emit('000',payload);
    console.log('Payload emitted:', payload);
  }

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
