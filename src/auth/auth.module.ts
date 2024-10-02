import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports:[ConfigModule,
    TypeOrmModule.forFeature([User]), 
    UsersModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{      
        return {
          secret:configService.get('JWT_SECRET'),
          signOptions:{
          expiresIn:'24h'
        }
      }
    }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, RolesGuard],
  exports:[TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
