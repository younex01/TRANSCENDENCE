import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  //create a fundtion that check if the user exist in the database if not throw and error

  async userExists(username: string): Promise<User> {
    const user = await this.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
