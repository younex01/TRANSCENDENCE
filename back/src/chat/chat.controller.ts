import { Controller, Req, Get, Body, Post, UploadedFile, UseInterceptors, Query, UseGuards} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid'
import { AuthGuard } from '@nestjs/passport';

@Controller('/chat')
export class ChatController {
    
  constructor(private readonly chatService: ChatService) {}

  @Get('/getChatGroups')
  @UseGuards(AuthGuard('jwt'))
  async getChatGroups() {
    return this.chatService.getChatGroups();
  }
  
  @Post('/createGroup')
  @UseGuards(AuthGuard('jwt'))
  async createGroup(@Body() chatGroup:any) {
    console.log(chatGroup)
    return this.chatService.createGroup(chatGroup);
  }

  @Post('/createUser')
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() user:any) {
    return this.chatService.createUser(user);
  }

  @Post('uploads')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async getGroupsByUserId(@Query('userId') userId: string) {
    try {
      const groups = await this.chatService.getGroupsByUserId(userId);
      return { success: true, data: groups };
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  @Get('/getGroupByGroupId')
  @UseGuards(AuthGuard('jwt'))
  async getGroupByGroupId(@Query('groupId') groupId: string) {
    try {
      const groups = await this.chatService.getGroupWithMembers(groupId);
      return {data: groups };
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  @Get('/getMsgsByGroupId')
  @UseGuards(AuthGuard('jwt'))
  async getMsgsByGroupId(@Query('groupId') groupId: string) {
    try {
      const message = await this.chatService.getGroupMessages(groupId);
      return {message };
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  @Get('/getIsMuted')
  @UseGuards(AuthGuard('jwt'))
  async getIsMuted(@Query('userId') userId: string, @Query('groupId') groupId: string) {
    const isMuted = await this.chatService.checkIfMuted(userId, groupId);
    return isMuted;
  }

  @Get('/checkIfMember')
  @UseGuards(AuthGuard('jwt'))
  async getIfMember(@Query('userId') userId: string, @Query('groupId') groupId: string) {
    const isMember = await this.chatService.checkIfMember(userId, groupId);
    return isMember;
  }






}
