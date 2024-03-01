import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma.service';
import { ChatService } from './chat.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [ChatGateway, PrismaService, ChatService],
  exports: [ChatService]
})
export class ChatModule {}