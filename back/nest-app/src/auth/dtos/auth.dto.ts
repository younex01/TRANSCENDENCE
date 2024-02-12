import { IsString } from "class-validator";

export class AuthDto{
    @IsString()
    id: string;
    
    @IsString()
    username: string;

    @IsString()
    avatar: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    //@IsString()
    //twoFactorAuthCode: string;
}