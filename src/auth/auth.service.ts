import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    async login(loginDto:LoginDto){
        const {password, email} = loginDto

        const user = await this.userRepository
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .select(["user.name", "user.email", "user.password", "user.role"])
        .getOne();
        if(!user || !bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Credentials are not valid')
        return {
            name: user.name,
            email: user.email,
            role: user.role,
            token:this.getJwtToken({email: user.email, role: user.role })
        }
    }

    private getJwtToken(payload:JwtPayload){
        const token = this.jwtService.sign(payload);
        return token
    }
}