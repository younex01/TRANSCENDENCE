import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './strategy/42strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AuthService, FortyTwoStrategy, PrismaService],
  controllers: [AuthController]
})
export class AuthModule {}
