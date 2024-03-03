import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) { }

  async isRequestExist(myId: string, receiverId: string) {
    return this.prisma.gameInvite.findFirst({
      where: {
        OR: [
          { receiverId: receiverId, senderId: myId, },
          { receiverId: myId, senderId: receiverId, }
        ]
      },
    });
  }

  async createPlayRequest(target: string, sender: string) {
    console.log("ldakhl dyal service", target, )
    return this.prisma.gameInvite.create({
      data: {
        senderId: sender,
        receiverId: target,
        status: "Pending"
      },
    });
  }

  async deletePlayRequest(myId: string, receiverId: string) {
    return this.prisma.gameInvite.deleteMany({
      where: {
        OR: [
          { receiverId: receiverId, senderId: myId, },
          { receiverId: myId, senderId: receiverId, }
        ]
      },
    });
  }

  async getMyNotifications(userId: string) {
    return this.prisma.gameInvite.findMany({
      where: {
        OR: [
          { receiverId: userId },
          { senderId: userId }
        ]
      },
      include: {
        sender: true,
        receiver: true
      }
    });
  }











}