import { SubscribeMessage, WebSocketGateway, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer} from '@nestjs/websockets';
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
  constructor(private chatService: ChatService) {}
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload:any) {
    await this.chatService.addMessagesToRoom(payload);
    const message = await this.chatService.getGroupMessages(payload.roomId);
    this.server.to(payload.roomId).emit('getAllMessages',message);
  }
  
  @SubscribeMessage('joinGroupChat')
  async handleJoiningGroupChat(client: Socket, payload:any) {
    if (await this.chatService.checkIfMember(payload.userId, payload.groupId) === 1)
    {
      client.emit("alreadyJoined", `You are already on that channel`);
      return;
    }
    const groupData = await this.chatService.getRoom(payload.groupId);
    if (payload.password && payload.password !== groupData.password)
    {
      client.emit("joinFailed", "Wrong Password");
      return;
    }
    console.log("paylaod", payload)
    await this.chatService.addRoomToUser(payload.userId, payload.groupId)
    await this.chatService.addUserToRoom(payload.userId, payload.groupId)

    client.join(payload.groupId);
    client.emit("joinSuccessfull", `You Joined ${payload.roomName}`);
    this.server.to(payload.groupId).emit("refresh");
  }

  @SubscribeMessage('kick')
  async kick(client: Socket, payload:any) {
    payload.message = `announcement ${payload.userId.split('-')[0]} has kicked ${payload.target.split('-')[0]} from this room`
    await this.chatService.removeUserFromRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }
  
  @SubscribeMessage('mute')
  async Mute(client: Socket, payload:any) {
    payload.message = `announcement ${payload.userId.split('-')[0]} has muted ${payload.target.split('-')[0]}`
    await this.chatService.MuteUserFromRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }
  
  @SubscribeMessage('unmute')
  async Unmute(client: Socket, payload:any) {
    payload.message = `announcement ${payload.userId.split('-')[0]} has unmuted ${payload.target.split('-')[0]}`
    await this.chatService.UnmuteUserFromRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }

  @SubscribeMessage('makeAdmin')
  async makeAdmin(client: Socket, payload:any) {
    payload.message = `announcement ${payload.target.split('-')[0]} in now an admin on this room`
    await this.chatService.makeAdminOnRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }

  @SubscribeMessage('removeAdmin')
  async removeAdmin(client: Socket, payload:any) {
    payload.message = `announcement ${payload.target.split('-')[0]} in no longer an admin on this room`
    await this.chatService.removeAdminOnRoom(payload.target, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit("refresh");
  }


  @SubscribeMessage('setRoomToPublic')
  async setRoomToPublic(client: Socket, payload:any) {
    await this.chatService.setRoomToPublic(payload.roomId);
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit('refresh', "Public");
  }

  @SubscribeMessage('setRoomToProtected')
  async setRoomToProtected(client: Socket, payload:any) {
    await this.chatService.setRoomToProtected(payload.roomId, payload.password);
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit('refresh');
  }


  @SubscribeMessage('changePassword')
  async changePassword(client: Socket, payload:any) {
    await this.chatService.changePassword(payload.roomId, payload.password);
    this.server.to(payload.roomId).emit('refresh');
  }

  @SubscribeMessage('leave')
  async leave(client: Socket, payload:any) {
    payload.message = `announcement ${payload.userId.split('-')[0]} has left the room`
    await this.chatService.removeUserFromRoom(payload.userId, payload.roomId)
    await this.handleSendMessage(client, payload)
    this.server.to(payload.roomId).emit('refresh');
  }

  @SubscribeMessage('addSocketToThisUserRoom')
  async addSocketToThisUserRoom(client: Socket, userId:any) {
    const rooms = await this.chatService.getGroupsByUserId(userId);
    if (rooms){
      rooms.map((room) => {
        client.join(room.id);
      })
    }
  }























































  handleConnection(client: any) {
  }

  handleDisconnect(client: any) {
  }

}

