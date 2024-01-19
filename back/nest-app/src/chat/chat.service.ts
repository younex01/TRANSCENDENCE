import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createGroup(chatGroup: Prisma.ChatGroupCreateInput) {
    return this.prisma.chatGroup.create({data: chatGroup});
  }
  async getChatGroups() {
    return this.prisma.chatGroup.findMany();
  }
}