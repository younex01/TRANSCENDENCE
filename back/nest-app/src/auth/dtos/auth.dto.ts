import { IsString } from "class-validator";

export class AuthDto{
    @IsString()
    username: string;

    @IsString()
    avatar: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}