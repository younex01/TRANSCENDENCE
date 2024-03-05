import { Module } from '@nestjs/common';
import { RandomFriendGateway } from './random-friend.gateway';
import { GameService } from './random-friend.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma.service';


@Module({
  providers: [RandomFriendGateway, GameService,UserService,PrismaService],
})
export class GameModule {}