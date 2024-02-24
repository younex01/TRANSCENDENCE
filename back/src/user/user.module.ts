import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { UserGateway } from './user.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatController } from 'src/chat/chat.controller';
import { ChatModule } from 'src/chat/chat.module';

@Module({  
  imports: [EventEmitterModule.forRoot(), ChatModule],
  providers: [UserGateway, PrismaService, UserService],
  controllers: [UserController]
})
export class UserModule {}
