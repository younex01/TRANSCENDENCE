import { Body, Controller, Get, Headers, Req, Res,Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Controller('user')
export class UserController {
    constructor(private readonly prisma: PrismaService) {}
    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async Getme(@Req() req, @Res() res, @Headers() headers)
    { 
        try {
            const user = req.user;
            return await res.send({info: true, user: user}); 
        }
        catch(e)
        {
            return await res.send({info: false, message: "Error while getting user"});
        }
    }


    @Get('dyali')
    @UseGuards(AuthGuard('jwt'))
    async Getdyali(userId: any)
    {
        return await this.prisma.userExists(userId);  
    }

    @Post('changeAvatar')
    @UseGuards(AuthGuard('jwt'))
    async changeAvatar(@Req() req, @Res() res, @Body() avatar: {avararUrl: string})
    {
        try {
            const user = req.user;
            const avatarUrl = avatar.avararUrl;
            await this.prisma.user.update({
                where: {id: user.id},
                data: {avatar: avatar.avararUrl}
            });
            return await res.send({info: true, message: "Avatar updated successfully"});
        }
        catch(e)
        {
            return await res.send({info: false, message: "Error while updating avatar"});
        }
    }
    
    @Post('changeInfos')
    @UseGuards(AuthGuard('jwt'))
    async changeUsername(@Req() req, @Res() res, @Body() Obj: {username: string, lastName: string, firstName:string, avatar: string})
    {
        console.log("aywaaaaaaa")
        try {
            const user = req.user;
            await this.prisma.user.update({
                where: {id: user.id},
                data: {username: Obj.username, firstName: Obj.firstName, lastName: Obj.lastName, avatar: Obj.avatar}
            });
            return await res.send({info: true, message: "Username updated successfully"});
        }
        catch(e)
        {
            return await res.send({info: false, message: "Error while updating username"});
        }
    }
    
}

