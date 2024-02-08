import { SubscribeMessage, WebSocketGateway, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server} from 'socket.io';
import { PrismaService } from 'src/prisma.service';
import { ChatService } from './chat.service';

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
  async handleSendMessage(client: Socket, payload:any) {
    console.log("payload", payload);
    await this.prisma.addMessagesToRoom(payload);
    const message = await this.prisma.getGroupMessages(payload.room);
    // console.log("9bel", message);
    console.log('room name ', payload.room)
    console.log('use id is :' , payload.userId)
    // client.in(payload.room).emit('iwa3ndak',message);
    this.server.to(payload.room).emit('getAllMessages',message);
  }
  
  @SubscribeMessage('joinGroupChat')
  async handleJoiningGroupChat(client: Socket, payload:any) {
    await this.prisma.addRoomToUser(payload.userId, payload.groupId)
    const groupData = await this.prisma.getRoom(payload.groupId);
    await this.prisma.addUserToRoom(payload.userId, payload.groupId)

    console.log("when joining, room ;", payload.groupId)
    client.join(payload.groupId);
  }

  @SubscribeMessage('kick')
  async kick(client: Socket, payload:any) {
    console.log("ldakhl dyal kick")
    await this.prisma.removeUserFromRoom(payload.userId, payload.groupId)
    this.server.to(payload.groupId).emit("refresh");
  }
  
  @SubscribeMessage('mute')
  async Mute(client: Socket, payload:any) {
    console.log("ldakhl dyal mute")
    await this.prisma.MuteUserFromRoom(payload.userId, payload.groupId)
    this.server.to(payload.groupId).emit("refresh");
  }

  @SubscribeMessage('unmute')
  async Unmute(client: Socket, payload:any) {
    console.log("ldakhl dyalunmuuuu mute")
    await this.prisma.UnmuteUserFromRoom(payload.userId, payload.groupId)
    this.server.to(payload.groupId).emit("refresh");
  }

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
