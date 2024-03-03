import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { GameModule } from './game/game.module';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [ChatModule, AuthModule, UserModule, GameModule, JwtModule.register({
    global: true,
    secret: 'dontTellAnyone',
    signOptions: { expiresIn: '30d' },
  })],
  controllers: [AppController, ChatController, GameController],
  providers: [AppService, ChatService, UserService, PrismaService, GameService, JwtService],
})
export class AppModule {}
