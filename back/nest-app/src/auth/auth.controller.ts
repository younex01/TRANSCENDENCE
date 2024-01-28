import { Controller, Get, Param, Req, Res, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly jwtService: JwtService,
    private readonly prisma: PrismaService) {}
    @Get('redirect')
    @UseGuards(AuthGuard('42'))
    async ft_redirect(@Req() req, @Res({passthrough: true}) res)
    {
        const payload = { sub: req.user.id };
        const token = await this.jwtService.signAsync(payload);
        res.cookie('JWT_TOKEN', token);
        return res.redirect('http://localhost:3000/HomePage');
    }
    @Post('logout')
    ft_logout(@Res() res)
    {
        res.clearCookie('JWT_TOKEN');
        return res.send({logout: true, message: 'Logged out'});
    }
}

@Controller('users')
export class userController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.prismaService.userExists(username);
    return user;
  }
}
