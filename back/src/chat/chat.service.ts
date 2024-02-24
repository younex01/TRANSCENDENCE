import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  async createGroup(chatGroup: any) {
    return this.prisma.chatGroup.create({ data: chatGroup });
  }

  async createUser(user: any) {
    return this.prisma.user.create({ data: user });
  }

  async getChatGroups() {
    return this.prisma.chatGroup.findMany({
      include: { members: true },
    });
  }

  async getRoom(groupId: string) {
    return this.prisma.chatGroup.findUnique({
      where: {
        id: groupId,
      }
    });
  }

  async addUserToRoom(userId: string, groupId: string) {
    return this.prisma.chatGroup.update({
      where: { id: groupId },
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
    return this.prisma.user.update({
      where: { id: userId },
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
    return this.prisma.chatGroup.findMany({
      where: {
        members: {
          some: {
            id: userId,
          }
        }
      },
      include: {members:true}
    });
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { groups: true }
    });
  }

  async getGroupWithMembers(groupId: string) {
    return this.prisma.chatGroup.findUnique({
      where: { id: groupId },
      include: { members: true },
    });
  }

  async addMessagesToRoom(payload: any) {
    console.log("ldakhl dyal addMessagesToRoom", payload)
    return this.prisma.chatGroup.update({
      where: { id: payload.roomId },
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

  async getGroupMessages(roomId: string) {
    console.log("ldakhl dyal getGroupMessages", roomId)
    return this.prisma.message.findMany({
      where: { chatGroupId: roomId },
      include: { sender: true }
    });
  }

  async removeUserFromRoom(userId: string, roomId: string) {

    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) return;

    const userIndex = room.members.findIndex((member) => member.id === user.id);

    if (userIndex === -1) return;

    return this.prisma.chatGroup.update({
      where: { id: roomId },
      data: {
        members: {
          disconnect: { id: userId }
        }
      }
    });
  }


  async checkIfMuted(userId: string, roomId: string) {
    return this.prisma.chatGroup.count({
      where: { id: roomId, mutedUsers: { has: userId } },
    });
  }


  async checkIfMember(userId: string, roomId: string) {
    return this.prisma.chatGroup.count({
      where:
      {
        AND: [
          { id: roomId },
          { members: { some: { id: userId } } }
        ]
      }
    });
  }

  async checkIfAlreadyAdmin(userId: string, roomId: string) {
    return this.prisma.chatGroup.count({
      where: { id: roomId, modes: { has: userId } },
    });
  }


  async MuteUserFromRoom(userId: string, roomId: string) {

    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) return;
    const userIndex = room.members.findIndex((member) => member.id === user.id);

    if (userIndex === -1) return;
    if (await this.checkIfMuted(userId, roomId) < 1) {
      return this.prisma.chatGroup.update({
        where: { id: roomId },
        data: {
          mutedUsers: {
            push: user.id
          }
        }
      });
    }
  }


  async UnmuteUserFromRoom(userId: string, roomId: string) {
    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) return;

    const userIndex = room.members.findIndex((member) => member.id === user.id);

    if (userIndex === -1) return;

    const newMutedList = room.mutedUsers.filter((user) => user != userId);

    return this.prisma.chatGroup.update({
      where: { id: roomId },
      data: {
        mutedUsers: {
          set: newMutedList
        }
      }
    });
  }


  async makeAdminOnRoom(userId: string, roomId: string) {
    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) return;

    const userIndex = room.members.findIndex((member) => member.id === user.id);

    if (userIndex === -1) return;

    if (await this.checkIfAlreadyAdmin(userId, roomId) < 1) {
      return this.prisma.chatGroup.update({
        where: { id: roomId },
        data: {
          modes: {
            push: user.id
          }
        }
      });
    }
  }


  async removeAdminOnRoom(userId: string, roomId: string) {
    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) return;
    const userIndex = room.members.findIndex((member) => member.id === user.id);
    if (userIndex === -1) return;
    const adminsList = room.modes.filter((user) => user != userId);
    return this.prisma.chatGroup.update({
      where: { id: roomId },
      data: {
        modes: {
          set: adminsList
        }
      }
    });
  }

  async setRoomToPublic(roomId: string) {
    return this.prisma.chatGroup.update({
      where: { id: roomId },
      data: {
        password: "",
        status: "Public"
      }
    });
  }

  async setRoomToProtected(roomId: string, password: string) {
    return this.prisma.chatGroup.update({
      where: { id: roomId },
      data: {
        password: password,
        status: "Protected"
      }
    });
  }

  async changePassword(roomId: string, password: string) {
    return this.prisma.chatGroup.update({
      where: { id: roomId },
      data: { password: password }
    });
  }


  async createDM(userId1: string, userId2: string) {
    console.log("user1; ", userId1)
    console.log("user2; ", userId2)
    const user1 = await this.getUser(userId1)
    const user2 = await this.getUser(userId2)
    console.log("user1; ", user1)
    console.log("user2; ", user2)
    if (!user1 || !user2) return;


    return this.prisma.chatGroup.create({
      data: {
        name: "",
        avatar: null,
        status: null,
        password: null,
        owner: null,
        type: "DM",
        members: {
          connect: [
            {id:userId1 },
            {id:userId2 }
          ]
        }
      },
      
    });
  }

}