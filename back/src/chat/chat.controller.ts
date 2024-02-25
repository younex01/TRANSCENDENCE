import { Controller, Req, Get, Body, Post, UploadedFile, UseInterceptors, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid'
import { AuthGuard } from '@nestjs/passport';

@Controller('/chat')
export class ChatController {

  constructor(private readonly chatService: ChatService) { }

  @Get('/getChatGroups')
  @UseGuards(AuthGuard('jwt'))
  async getChatGroups() {
    return this.chatService.getChatGroups();
  }

  @Post('/createGroup')
  async createGroup(@Body() chatGroup: any) {
    return this.chatService.createGroup(chatGroup);
  }

  @Post('/createUser')
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() user: any) {
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
      for (let group of groups) {
        if (group.type === 'DM') {
          const otherMember = group.members.find(member => member.id !== userId);

          if (otherMember) {
            group.name = otherMember.username;
            group.avatar = otherMember.avatar;
          }
          group.members = group.members.filter(member => member.id !== userId);
        }
      }
      return { success: true, data: groups };
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  @Get('/getGroupByGroupId')
  @UseGuards(AuthGuard('jwt'))
  async getGroupByGroupId(@Query('groupId') groupId: string, @Query('myId') myId: string) {
    try {
      const group = await this.chatService.getGroupWithMembers(groupId);
      if (group.type === 'DM') {
        const otherMember = group.members.find(member => member.id !== myId);

        if (otherMember) {
          group.name = otherMember.username;
          group.avatar = otherMember.avatar;
        }
        group.members = group.members.filter(member => member.id !== myId);
      }
      return { data: group };
    } catch (error) {
      console.error('Error :', error.message);
    }
  }

  @Get('/getMsgsByGroupId')
  @UseGuards(AuthGuard('jwt'))
  async getMsgsByGroupId(@Query('groupId') groupId: string) {
    try {
      const message = await this.chatService.getGroupMessages(groupId);
      return { message };
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

  @Get('/getDm')
  @UseGuards(AuthGuard('jwt'))
  async getDm(@Query('myId') myId: string, @Query('othersId') othersId: string) {
    const groupId = await this.chatService.isDMalreadyexist(myId, othersId);
    return groupId.id;
  }


}
