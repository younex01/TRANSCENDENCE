import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { PrismaService } from 'src/prisma.service';
import { GameService } from './game.service';

@Module({
  imports: [],
  providers: [GameGateway, PrismaService, GameService],
  exports: [GameService]
})
export class GameModule {}