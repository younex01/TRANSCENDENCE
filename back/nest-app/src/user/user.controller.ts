import { Body, Controller, Get, Headers, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Controller('user')
export class UserController {
    constructor(private readonly prisma: PrismaService) {}
    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async Getme(@Req() req, @Res() res, @Headers() headers)
    {
        const user = req.user;
       return await res.send({info: true, user: user}); 
    }


    @Get('dyali')
    @UseGuards(AuthGuard('jwt'))
    async Getdyali(userId: any)
    {
        return await this.prisma.userExists(userId);  
    }
}

