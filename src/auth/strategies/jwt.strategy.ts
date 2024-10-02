import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        private readonly configService:ConfigService
    ){
        super({
            secretOrKey: configService.get<string>('JWT_SECRET'),
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        });

    }

    async validate(payload:JwtPayload):Promise<User>{

        const {email} = payload

        const user = await this.userRepository.findOneBy({ email });

        if(!user) throw new UnauthorizedException('Token not valid')

        return user;
    }

}