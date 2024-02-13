import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

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
