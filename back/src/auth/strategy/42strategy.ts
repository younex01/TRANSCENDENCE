// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { AuthService } from "../auth.service";
// import Strategy from "passport-42";

// @Injectable()
// export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
//     constructor(private readonly authService: AuthService){
//         super({
//             clientID: 'u-s4t2ud-b1506d5ed0f4c81ab2f5b4fb7d2b896abdc9a97f90b6ce1c198d903d87c59418', // it's a best practice to put it your .env !!!!!
//             clientSecret: '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', // it's a best practice to put it your .env !!!!!
//             callbackURL: 'http://localhost:4000/auth/redirect',
//         });
//     }

//     async validate(accessToken: string, refreshToken: string, profile: any){
    //     }
    // }
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
            clientID: 'u-s4t2ud-1bdfb4911333ace17c174b3425984b08828423d2d510b3ba59ede898792699ae', // matnssach t7etha f ".env" !!!!!
            clientSecret: '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', // matnssach t7etha f ".env" !!!!!
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