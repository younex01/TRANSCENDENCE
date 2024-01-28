import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';

const extractCookie = (req: Request): string | null => {
    console.log("cookies", req.cookies);
    // console.log("cookies", req.cookies.token);
  if (req.cookies && req.cookies.JWT_TOKEN) {
    return req.cookies.JWT_TOKEN;
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: 'dontTellAnyone',
    });
  }

  async validate(payload: any) {
    console.log("payload", payload);
    const user = await this.prisma.user.findUnique({where: {id: payload.sub}});
    console.log("JWWWWWTTTTT " +user.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}