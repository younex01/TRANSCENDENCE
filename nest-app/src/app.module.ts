import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ChatModule],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService, PrismaService ],
})
export class AppModule {}
