import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { UserGateway } from './user.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({  
  imports: [EventEmitterModule.forRoot()],
  providers: [UserGateway, PrismaService, UserService],
  controllers: [UserController]
})
export class UserModule {}
