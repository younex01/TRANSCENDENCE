import { Controller, Get, Param, Req, Res, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Controller('auth')
export class AuthController {
    constructor(private readonly jwtService: JwtService,
    private readonly prisma: PrismaService) {}
    @Get('redirect')
    @UseGuards(AuthGuard('42'))
    async ft_redirect(@Req() req, @Res() res)
    {
        console.log('in the auth controller');  
        const payload = { sub: req.user.id };
        const token = await this.jwtService.signAsync(payload);
        res.cookie('JWT_TOKEN', token);
        return res.redirect('http://localhost:3000/Settings');
    }

    @Post('logout')
    ft_logout(@Res() res)
    {
        res.clearCookie('JWT_TOKEN');
        return res.send({logout: true, message: 'Logged out'});
    }

    @Post('generateTwoFactorAuthCode')
    async generateTwoFactorAuthCode(@Req() req, @Res() res) {
        const user = await this.prisma.user.findUnique({ where: { id: req.user.id } });
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        const secret = speakeasy.generateSecret();
        await this.prisma.user.update({ where: { id: req.user.id }, data: { twoFactorAuthCode: secret.base32 } });
    
        // Generate a QR code
        const otpauthUrl = speakeasy.otpauthURL({
            secret: secret.base32,
            label: 'MyApp', // Replace 'MyApp' with the name of your app
            issuer: 'MyCompany', // Replace 'MyCompany' with the name of your company
            encoding: 'base32',
        });
        const qrCodeImageUrl = await qrcode.toDataURL(otpauthUrl);
    
        return res.json({ qrCodeImageUrl });
    
    }

    @Post('verifyTwoFactorAuthCode')
    async verifyTwoFactorAuthCode(@Req() req, @Res() res) {
        const user = await this.prisma.user.findUnique({ where: { id: req.user.id } });
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isVerified = speakeasy.totp.verify({
            secret: user.twoFactorAuthCode,
            encoding: 'base32',
            token: req.body.token,
        });

        if (isVerified) {
            return res.json({ message: 'User is verified' });
        } else {
            return res.status(400).json({ message: 'Invalid token' });
        }
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
