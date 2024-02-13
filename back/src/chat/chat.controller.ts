import { Controller, Req, Get, Body, Post, UploadedFile, UseInterceptors, Query} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid'

@Controller('/chat')
export class ChatController {
    
  constructor(private readonly chatService: ChatService) {}

  @Get('/getChatGroups')
  async getChatGroups() {
    return this.chatService.getChatGroups();
  }
  
  @Post('/createGroup')
  async createGroup(@Body() chatGroup:any) {
    return this.chatService.createGroup(chatGroup);
  }

  @Post('/createUser')
  async createUser(@Body() user:any) {
    return this.chatService.createUser(user);
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/groupsImages',
      filename: (req, file, callback) => {
        const filename = path.parse(file.originalname).name + uuidv4();
        const extension = path.parse(file.originalname).ext;
        callback(null, `${filename}${extension}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file) {
    return (file.path);
  }

  @Get('/getGroupsByUserId')
  async getGroupsByUserId(@Query('userId') userId: string) {
    try {
      const groups = await this.chatService.getGroupsByUserId(userId);
      return { success: true, data: groups };
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  @Get('/getGroupByGroupId')
  async getGroupByGroupId(@Query('groupId') groupId: string) {
    try {
      const groups = await this.chatService.getGroupWithMembers(groupId);
      return {data: groups };
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  @Get('/getMsgsByGroupId')
  async getMsgsByGroupId(@Query('groupId') groupId: string) {
    try {
      const message = await this.chatService.getGroupMessages(groupId);
      return {message };
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  @Get('/getIsMuted')
  async getIsMuted(@Query('userId') userId: string, @Query('groupId') groupId: string) {
    const isMuted = await this.chatService.checkIfMuted(userId, groupId);
    return isMuted;
  }

  @Get('/checkIfMember')
  async getIfMember(@Query('userId') userId: string, @Query('groupId') groupId: string) {
    const isMember = await this.chatService.checkIfMember(userId, groupId);
    return isMember;
  }






}
