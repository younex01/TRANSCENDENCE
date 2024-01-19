import { Controller, Req, Get, Body, Post, UploadedFile, UseInterceptors, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { of } from 'rxjs';
import {v4 as uuidv4} from 'uuid'

@Controller('/chat')
export class ChatController {
    
  constructor(private readonly chatService: ChatService) {}

  @Get('/getChatGroups')
  async getChatGroups() {
    return this.chatService.getChatGroups();
  }
  
  @Post('/createGroup')
  async createGroup(@Body() chatGroup: Prisma.ChatGroupCreateInput) {
    console.log("Received data from client:", chatGroup);
    console.log(chatGroup);
    return this.chatService.createGroup(chatGroup);
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/groupsImages',
      filename: (req, file, callback) => {
        const filename = path.parse(file.originalname).name;
        const extension = path.parse(file.originalname).ext;
        callback(null, `${filename}${extension}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file) {
    try {
      if (!file || !file.path) {
        throw new BadRequestException('Invalid file');
      }
  
      console.log("File received:", file);
      console.log("File received:", file.path);
      return { imagepath: file.path };
    } catch (error) {
      console.error('Error processing the file:', error);
      throw new InternalServerErrorException('Failed to process the file');
    }
  }
  
}
