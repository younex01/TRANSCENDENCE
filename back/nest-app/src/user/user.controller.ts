import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from 'src/auth/guards/42guards';
import { PrismaService } from 'src/prisma.service';

@Controller('user')
export class UserController {
    constructor(private readonly prisma: PrismaService) {}
    @Get('me')
    async Getme(@Req() req: any)
    {
        const user = req.user;
        return {
            username: user.username,
            displayName: user.displayName,
            avatar: user.avatar,
        };
        }
    }
