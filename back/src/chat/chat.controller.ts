import { Controller, Req, Get, Body, Post, UploadedFile, UseInterceptors, Query, UseGuards, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid'
import { AuthGuard } from '@nestjs/passport';
import { ChangeProtectedChannelPassword, ChangeToProtected, ChatChannelDTO } from './chat.dto';
import { UserService } from 'src/user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('/chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {

  constructor(private readonly chatService: ChatService, private readonly userService: UserService, private eventEmitter: EventEmitter2) { }

  @Get('/getChatGroups')
  async getChatGroups() {
    return await this.chatService.getChatGroups();
  }

  @Post('/createGroup')
  async createGroup(@Body() chatGroup: ChatChannelDTO) {
    const isNameAlreadyExistes = await this.chatService.roomNameCheck(chatGroup.name);
    if (isNameAlreadyExistes)
      throw new BadRequestException('Name already taken')
    return await this.chatService.createGroup(chatGroup);
  }

  @Post('/createUser')
  async createUser(@Body() user: any) {
    return await this.chatService.createUser(user);
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
  async getGroupByGroupId(@Query('groupId') groupId: string, @Query('myId') myId: string) {
    console.log("wach hna?")
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
  async getMsgsByGroupId(@Query('groupId') groupId: string) {

    const roomData = await this.chatService.getRoom(groupId);
    if (!roomData)
      throw new NotFoundException("Group not found");

    const message = await this.chatService.getGroupMessages(groupId);
    return { message };
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

  @Get('/getDm')
  async getDm(@Query('myId') myId: string, @Query('othersId') othersId: string) {
    console.log("hnaaaaaaaaaa", myId, othersId);
    const groupId = await this.chatService.isDMalreadyexist(myId, othersId);
    if(!groupId) return;
    console.log("groupId --------", groupId)
    return groupId.id;
  }

  @Post('/addToPrivateRoom')
  async addToPrivateRoom(@Body() payload: ChatChannelDTO) {
    const isNameAlreadyExistes = await this.chatService.roomNameCheck(payload.name);
    if (isNameAlreadyExistes)
      throw new BadRequestException('Name already taken')
    return await this.chatService.addUserToPrivateRoom(payload);
  }

  @Post('/changeRoomPassword')
  async changeRoomPassword(@Body() payload: ChangeProtectedChannelPassword) {

    const roomData = await this.chatService.getRoom(payload.roomId);
    if (roomData && roomData.password === payload.password)
      throw new BadRequestException("Can't set the new password to the cuurent one. Chose a different Password")
    await this.chatService.changeRoomPassword(payload.roomId, payload.password);
    this.eventEmitter.emit("changeRoomPassword");
  }

  @Post('/setRoomToProtected')
  async changeRoomToProtected(@Body() payload: ChangeToProtected) {
    const roomData = await this.chatService.getRoom(payload.roomId);
    if (!roomData) return;

    const user = await this.userService.getUser(payload.userId);
    if (!user) return;

    await this.chatService.setRoomToProtected(payload.roomId, payload.password);
    this.eventEmitter.emit('setRoomToProtected', "lkhwa", payload);
  }

}
