import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [ChatGateway, PrismaService]
})
export class ChatModule {}