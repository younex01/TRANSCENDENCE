import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getRoom(groupId:string) {
    console.log("ldakhl dyal getRooms: ", groupId)
      return this.chatGroup.findUnique({
        where: {
          id: groupId,
        }
      });
  }

  async addUserToRoom(userId: string, groupId: string) {
    return this.chatGroup.update({
      where: { id: groupId},
      data: {
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async addRoomToUser(userId: string, groupId: string) {
    return this.user.update({
      where: { id: userId},
      data: {
        groups: {
          connect: {
            id: groupId,
          },
        },
      },
    });
  }

  async getGroupsByUserId(userId: string) {
    return this.chatGroup.findMany({
      where: { 
        members: {
          some: {
            id: userId,
          }
        }
      },
    });
  }

  async getUser(userId: string) {
    return this.user.findUnique({
      where: {  id: userId },
      include: {groups: true}
    });
  }

  async getGroupWithMembers(groupId: string) {
    return this.chatGroup.findUnique({
      where: { id: groupId},
      include: {members: true},
    });
  }

  async addMessagesToRoom(payload:any) {
    return this.chatGroup.update({
      where: { id: payload.room},
      data: {
        messages: {
          create: {
            content: payload.message,
            userId: payload.userId,
          },
        },
      },
    });
  }

  async getGroupMessages(roomId:string) {
    return this.message.findMany({
      where: { chatGroupId: roomId},
    });
  }

  async removeUserFromRoom(userId:string, roomId:string) {

    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) {
      console.log('the User or the Room is not found');
      return;
    }

    const userIndex = room.members.findIndex((member) => member.id === user.id);

    if (userIndex === -1) {
      console.log('User not found in the room');
      return;
    }

    return this.chatGroup.update({
      where: { id: roomId },
      data: {
        members: {
            disconnect: { id: userId }
        }
      }
    });
  }
  
  async MuteUserFromRoom(userId:string, roomId:string) {

    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) {
      console.log('the User or the Room is not found');
      return;
    }
    const userIndex = room.members.findIndex((member) => member.id === user.id);

    if (userIndex === -1) {
      console.log('User not found in the room');
      return;
    }
    console.log('userIndex', userIndex);
    
    return this.chatGroup.update({
      where: { id: roomId },
      data: {
        mutedUsers:{
          push: user.id
        }
      }
    });
  }
  
    
  async checkIfMuted(userId:string, roomId:string) {
    return this.chatGroup.count({
      where: { id: roomId, mutedUsers: {has: userId}},
    });
  }


  async UnmuteUserFromRoom(userId:string, roomId:string) {
console.log("---------------- ldakhl dyal UnmuteUserFromRoom ----------------");
    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) {
      console.log('the User or the Room is not found');
      return;
    }
    const userIndex = room.members.findIndex((member) => member.id === user.id);

    if (userIndex === -1) {
      console.log('User not found in the room');
      return;
    }
    console.log('userIndex', userIndex);

    const newMutedList = room.mutedUsers.filter((user) => user != userId);
    
    return this.chatGroup.update({
      where: { id: roomId },
      data: {
        mutedUsers:{
          push: newMutedList
        }
      }
    });

  }




}

