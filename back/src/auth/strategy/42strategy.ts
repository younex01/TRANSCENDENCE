import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-42";
import { PrismaService } from "src/prisma.service";
import { AuthDto } from "../dtos/auth.dto";
import { AuthService } from "../auth.service";


@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly prisma: PrismaService,
        private readonly service: AuthService) {
        super({
            clientID: process.env.CLIENT_ID, // matnssach t7etha f ".env" !!!!!
            clientSecret: process.env.CLIENT_SECRET, // matnssach t7etha f ".env" !!!!!
            callbackURL: 'http://localhost:4000/auth/redirect',
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const dto : AuthDto = {
            id: profile._json.id,
            username: profile._json.login,
            avatar: profile._json.image.link,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            twoFactorAuthEnabled: profile._json.twoFactorAuthEnabled,
        }
        const user = await this.service.findOrCreate(dto);
        if (!user)
            throw new UnauthorizedException("User not found");
        return user;
    }
}
// _json: {
//     id: 93960,
//     email: 'sharrach@student.1337.ma',
//     login: 'sharrach',
//     first_name: 'Salah-eddine',
//     last_name: 'Harrachmin',
//     usual_full_name: 'Salah Eddine Harrachmin',
//     usual_first_name: null,
//     url: 'https://api.intra.42.fr/v2/users/sharrach',
//     phone: 'hidden',
//     displayname: 'Salah Eddine Harrachmin',
//     kind: 'student',
//     image: {
//       link: 'https://cdn.intra.42.fr/users/9fe37480f3ad41e2b285e990de9efb4f/sharrach.jpg',
//       versions: [Object]
//     },