import { Controller, Req, Get, Body, Post, UploadedFile, UseInterceptors, Query, UseGuards, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { GameService } from './game.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('/game')
@UseGuards(AuthGuard('jwt'))
export class GameController {

  constructor(private readonly gameService: GameService, private readonly UserService: UserService, private eventEmitter: EventEmitter2) { }

  @Post('accept')
  @UseGuards(AuthGuard('jwt'))
  async Accept(@Body() req: any) {
    const user = await this.UserService.getUser(req.target);
    if (!user) return;

    // const isRequestExist = await this.gameService.isRequestExist(req.myId, req.receiverId);

    // req.notif = isRequestExist;
    // if (isRequestExist) this.acceptFriendRequest(req);

  }


  @Post('sendPlayRequest')
  @UseGuards(AuthGuard('jwt'))
  async sendPlayRequest(@Body() req: any) {
    console.log("wach dkhol 1");
    
    const user = await this.UserService.getUser(req.target);
    console.log("wach dkhol 2", user);
    if (!user) return;
    
    console.log("wach dkhol 3");
    
    const isRequestExist = await this.gameService.isRequestExist(req.target, req.sender);
    console.log("wach dkhol 3", isRequestExist);
    if (isRequestExist )
      await this.gameService.deletePlayRequest(req.target, req.sender);
    
    await this.gameService.createPlayRequest(req.target, req.sender);
    console.log("mera ga3 hh");
    this.eventEmitter.emit("refreshNotifications");
  }

  @Get('getMyNotifications')
  @UseGuards(AuthGuard('jwt'))
  async getMyNotifications(@Query('userId') userId: string) {
      const myNotifications = await this.gameService.getMyNotifications(userId);
      return myNotifications;
  }


}
