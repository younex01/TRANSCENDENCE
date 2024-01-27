import { IsString } from "class-validator";

export class AuthDto{
    @IsString()
    username: string;

    @IsString()
    avatar: string;

    @IsString()
    displayName: string;
}