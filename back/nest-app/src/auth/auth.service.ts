import { Injectable } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
    async findOrCreate(dto: AuthDto)
    {
        const user = await this.prisma.user.findUnique({where: {username: dto.username}}); 
        // console.log("user", user);
        if (user)
            return user;
        const createNewUser = await this.prisma.user.create({
            data: {
                username: dto.username,
                displayName: dto.displayName,
                avatar: dto.avatar,
            },
        });
        
        console.log("NewUser       " + createNewUser);
        console.log("createNewUser       " + createNewUser.avatar);
        console.log("ldakhl dyal   findOrCreate  " + createNewUser);
        return createNewUser;
    }
}
