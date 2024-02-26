import { Module } from '@nestjs/common';
import { RandomFriendGateway } from './random-friend.gateway';
import { GameService } from './random-friend.service';

@Module({
  providers: [RandomFriendGateway, GameService],
})
export class GameModule {}