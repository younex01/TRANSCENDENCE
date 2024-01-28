import { Body, Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Controller('/user')
export class UserController {
    constructor(private readonly prisma: PrismaService) {}
    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    async Getme(@Req() req, @Res() res)
    {
        const user = req.user;
        // console.log("user", user);
       return await res.send({info: true, user: user}); 
        }
    }

