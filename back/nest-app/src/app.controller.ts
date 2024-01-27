import { Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  gethello(){
    return this.appService.getHello()
  }
// create a controloer with an endpoint thatt gets the user data
//
}


@Controller('users')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.prismaService.userExists(username);
    return user;
  }
}