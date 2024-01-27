import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Get('redirect')
    @UseGuards(AuthGuard('42'))
    ft_redirect(@Res() res)
    {
        res.redirect('http://localhost:3000/HomePage');
        return {message: 'Redirected'};
    }
}
