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
  
  async roomNameCheck(roomName:string) {
    return this.prisma.chatGroup.count({
      where : {name:roomName}
    });
  }

  async getChatGroups() {
    return this.prisma.chatGroup.findMany({
      include: { members: true },
    });
  }

  async getRoom(groupId: string) {
    return this.prisma.chatGroup.findUnique({
      where: { id: groupId }
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
      include: { members: true }
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
    return this.prisma.message.findMany({
      where: { chatGroupId: roomId },
      include: { sender: true }
    });
  }

  async kickUserFromRoom(userId: string, roomId: string) {

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

  async banUserFromRoom(userId: string, roomId: string) {

    const room = await this.getGroupWithMembers(roomId);
    const user = await this.getUser(userId);

    if (!room || !user) return;
    const userIndex = room.members.findIndex((member) => member.id === user.id);

    if (userIndex === -1) return;

    if (await this.checkIfBanned(userId, roomId) === 1) return
    return this.prisma.chatGroup.update({
      where: { id: roomId },
      data: {
        members: {
          disconnect: { id: userId }
        },
        bannedUssers: {
          push: user.id
        }
      }
    });
  }

  async checkIfMuted(userId: string, roomId: string) {
    return this.prisma.chatGroup.count({
      where: { id: roomId, mutedUsers: { has: userId } },
    });
  }

  async checkIfBanned(userId: string, roomId: string) {
    return this.prisma.chatGroup.count({
      where: {
        AND: [
          { id: roomId },
          { bannedUssers: { has: userId } }
        ]
      }
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

  async changeRoomPassword(roomId: string, password: string) {
    return this.prisma.chatGroup.update({
      where: { id: roomId },
      data: { password: password }
    });
  }


  async isDMalreadyexist(userId1: string, userId2: string) {
    return await this.prisma.chatGroup.findFirst({
      where: {
        type: "DM",
        AND: [
          {
            members: {
              some: {
                id: userId1
              }
            }
          },
          {
            members: {
              some: {
                id: userId2
              }
            }
          },
        ]
      }
    });
  }

  async createDM(userId1: string, userId2: string) {
    const user1 = await this.getUser(userId1)
    const user2 = await this.getUser(userId2)
    if (!user1 || !user2) return;

    const isDMalreadyexist = await this.isDMalreadyexist(userId1, userId2);
    if (isDMalreadyexist) return;

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
            { id: userId1 },
            { id: userId2 }
          ]
        }
      },

    });
  }

  async addUserToPrivateRoom(payload: any) {
    console.log("payload", payload);
    return await this.prisma.chatGroup.create({
      data: {
        name: payload.name,
        avatar: payload.avatar,
        status: payload.status,
        owner: payload.owner,
        type: "",
        members: {
          connect: payload.addingToPrivateRoomList.map((userId: string) => ({
            id: userId,
          })),
        }
      },
    });
  }






}