import { Body, Controller, Get, Headers, Req, Res, Post, UnauthorizedException, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import Fuse from 'fuse.js';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly prisma: PrismaService, private eventEmitter: EventEmitter2, private UserService: UserService) { }
    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async Getme(@Req() req, @Res() res, @Headers() headers) {
        try {
            const user = req.user;
            return await res.send({ info: true, user: user });
        }
        catch (e) {
            return await res.send({ info: false, message: "Error while getting user" });
        }
    }


    @Get('dyali')
    @UseGuards(AuthGuard('jwt'))
    async Getdyali(userId: any) {
        return await this.prisma.userExists(userId);
    }

    @Post('changeAvatar')
    @UseGuards(AuthGuard('jwt'))
    async changeAvatar(@Req() req, @Res() res, @Body() avatar: { avararUrl: string }) {
        try {
            const user = req.user;
            const avatarUrl = avatar.avararUrl;
            await this.prisma.user.update({
                where: { id: user.id },
                data: { avatar: avatar.avararUrl }
            });
            return await res.send({ info: true, message: "Avatar updated successfully" });
        }
        catch (e) {
            return await res.send({ info: false, message: "Error while updating avatar" });
        }
    }

    @Post('changeInfos')
    @UseGuards(AuthGuard('jwt'))
    async changeUsername(@Req() req, @Res() res, @Body() Obj: { username: string, lastName: string, firstName: string, avatar: string }) {
        try {
            const user = req.user;
            await this.prisma.user.update({
                where: { id: user.id },
                data: { username: Obj.username, firstName: Obj.firstName, lastName: Obj.lastName, avatar: Obj.avatar }
            });
            return await res.send({ info: true, message: "Username updated successfully" });
        }
        catch (e) {
            return await res.send({ info: false, message: "Error while updating username" });
        }
    }


    @Get('getUserByUserId')
    @UseGuards(AuthGuard('jwt'))
    async getUserByUserId(@Query('user') user: string, @Req() req) {
        const users = await this.prisma.getUserByUserId(user);
        return users;
    }

    @Get('getAllUsers')
    @UseGuards(AuthGuard('jwt'))
    async getAllUsers(@Query('input') input: string) {
        const users = await this.prisma.getAllUsers();
        const options = {
            keys: ['username', 'firstName', 'lastName'],
            threshold: 0.2
        }
        const fuse = new Fuse(users, options);
        const filtered = fuse.search(input).map((elem) => elem.item);
        const modifiedFiltered = filtered.map(user => {
            const { twoFactorAuthCode, twoFactorAuthEnabled, firstLogin, ...rest } = user;
            return rest;
        });
        return modifiedFiltered;
    }

    


    @Post('sendFriendRequest')
    @UseGuards(AuthGuard('jwt'))
    async sendFriendRequest(@Body() req: any) {
        const user = await this.UserService.getUser(req.target);

        console.log("test1");

        if (!user) return;
        console.log("test2");
        const isRequestExist = await this.UserService.isRequestExist(req.target, req.sender);
        console.log("test3");
        console.log("isRequestExist", isRequestExist);
        if (isRequestExist && isRequestExist.status === "Declined") {
            console.log("test4");

            await this.UserService.pendFriendRequest(isRequestExist.id, req.sender, req.target);
        }
        else {
            console.log("test5");

            await this.UserService.createFriendRequest(req.target, req.sender);
        }
        this.eventEmitter.emit("refreshNotifications");
        this.eventEmitter.emit("refreshfriendShip");
    }

    @Post('acceptFriendRequest')
    @UseGuards(AuthGuard('jwt'))
    async acceptFriendRequest(@Body() req: any) {
        const isExiste = await this.UserService.isRequestExistAndPending(req.notif.id, req.myId);
        if (isExiste !== 1) return;

        await this.UserService.acceptFriendRequest(req.notif.id);
        await this.UserService.makeFriends1(req.myId, req.notif.senderId);
        await this.UserService.makeFriends2(req.myId, req.notif.senderId);
        this.eventEmitter.emit("refreshNotifications");
        this.eventEmitter.emit("refreshfriendShip");

    }


    @Post('declineFriendRequest')
    @UseGuards(AuthGuard('jwt'))
    async declineFriendRequest(@Body() req: any) {
        const isExiste = await this.UserService.isRequestExistAndPending(req.notif.id, req.myId);

        if (isExiste !== 1) return;
        // await this.UserService.a(req.notif.id);
        await this.UserService.declineFriendRequest(req.notif.id);
        console.log("declin..........")
        this.eventEmitter.emit("refreshNotifications");
        this.eventEmitter.emit("refreshfriendShip");
        // return myNotifications;

    }

    @Get('getMyNotifications')
    @UseGuards(AuthGuard('jwt'))
    async getMyNotifications(@Query('userId') userId: string) {
        const myNotifications = await this.UserService.getMyNotifications(userId);
        return myNotifications;

    }

    @Get('requestStatus')
    @UseGuards(AuthGuard('jwt'))
    async requestStatus(@Query('myId') myId: string, @Query('receiverId') receiverId: string) {
        const request = await this.UserService.isRequestExist(myId, receiverId);
        if (!request) return 0;
        // this.eventEmitter.emit("refreshfriendShip");
        return request;
    }

    @Get('checkIfFriend')
    @UseGuards(AuthGuard('jwt'))
    async checkIfFriend(@Query('myId') myId: string, @Query('receiverId') otherUser: string) {
        const checkIfFriend = await this.UserService.checkIfFriend(myId, otherUser);
        // this.eventEmitter.emit("refreshfriendShip");
        return (checkIfFriend);
    }

    @Post('blockUser')
    @UseGuards(AuthGuard('jwt'))
    async blockUser(@Body() req: any) {
        const user = await this.UserService.getUser(req.target);
        if (!user) return;

        const isRequestExist = await this.UserService.isRequestExist(req.myId, req.target);
        if (isRequestExist) {
            const checkIfFriend = await this.UserService.checkIfFriend(req.myId, req.target);
            if (checkIfFriend) {
                await this.UserService.removeFriendShip1(isRequestExist.senderId, isRequestExist.receiverId);
                await this.UserService.removeFriendShip2(isRequestExist.receiverId, isRequestExist.senderId);
            }
            await this.UserService.removeFriendRequest(isRequestExist.id);
        };


        await this.UserService.blockedUsers(req.myId, req.target);
        await this.UserService.blockedByUsers(req.myId, req.target);
        this.eventEmitter.emit("refreshfriendShip");
        this.eventEmitter.emit("refreshNotifications");
    }

    @Post('UnblockUser')
    @UseGuards(AuthGuard('jwt'))
    async UnblockUser(@Body() req: any) {
        const user = await this.UserService.getUser(req.target);
        if (!user) return;

        const isBlocked = await this.UserService.getIsBlocked(req.myId, req.target);
        const isBlockedBy = await this.UserService.getIsBlockedBy(req.myId, req.target);
        if (!isBlocked || !isBlockedBy) return;

        await this.UserService.unblockBlockedUsers(req.myId, req.target);
        await this.UserService.removekBlockedByUsers(req.myId, req.target);
        this.eventEmitter.emit("refreshfriendShip");
        this.eventEmitter.emit("refreshNotifications");
    }


    @Post('accept')
    @UseGuards(AuthGuard('jwt'))
    async Accept(@Body() req: any) {
        const user = await this.UserService.getUser(req.target);
        if (!user) return;

        const isRequestExist = await this.UserService.isRequestExist(req.myId, req.receiverId);

        req.notif = isRequestExist;
        if (isRequestExist) this.acceptFriendRequest(req);
 
    }
    
    @Post('userFreinds')
    @UseGuards(AuthGuard('jwt'))
    async displayFriends(@Body() req:any)
    {
        console.log("helloooo", req);
        // console.log("helloooo", req);
        const friendsList = await this.UserService.friendList(req.myId);
        console.log("yesssss", friendsList);
        
        return friendsList;
    }


    // sendRequest(receiver) //
    //// -- check receiver exists
    //// -- check if request between userID and receiver
    //// -- prisma.friendRequest.create({..., status: PENDING})
    //// -- return success
    // acceptRequest(requestId) //
    //// -- check request exists
    //// -- check if request is PENDING
    //// -- request.senderId !== user.id
    //// -- prisma.friendRequest.update({ data: { status: ACCEPTED }})
    //// -- prisma.user.update(id:senderId, { data: { friends: connect: friendRequest.ReceiverId }})
    //// -- return success
    // declineRequest(requestId) //
    //// -- request.senderId !== user.id
    //// -- check request exists
    //// -- check if request is PENDING
    //// -- prisma.friendRequest.update({ data: { status: DECLINED }})
    //// -- return success


    // block(userId)
    //// -- prisma.user.update(id:senderId, { data: { friends: disconnect: userId, blockedUsers: connect: userId }})

    // unblock(userId)
    //// -- prisma.user.update(id:senderId, { data: { blockedUsers: disconnect: userId }})


}