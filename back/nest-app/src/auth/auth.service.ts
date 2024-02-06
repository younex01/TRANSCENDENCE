import { Injectable } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
    async findOrCreate(dto: AuthDto)
    {
        const user = await this.prisma.user.findUnique({where: {id: dto.id.toString()}}); 
        if (user)
            return user;
        const createNewUser = await this.prisma.user.create({
            data: {
                id: dto.id.toString(),
                username: dto.username,
                firstName: dto.firstName,
                lastName: dto.lastName,
                avatar: dto.avatar,
            },
        });
        
        return createNewUser;
    }
}

