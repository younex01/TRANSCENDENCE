import { Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}
  
  @Get("/")
  async healthCheck() {
    return "ok";
  }
}
