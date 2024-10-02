import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/common/enums/role.enum'; // Ajusta la ruta según sea necesario
import { JwtAuthGuard } from './jwt-guard.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        jwtService: JwtService,
        configService: ConfigService
    ) {
        super(jwtService, configService); // Llama al constructor de JwtAuthGuard
    }

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const isAuthenticated = await super.canActivate(context);
        if (!isAuthenticated) {
            return false; // Si no está autenticado, no permite el acceso
        }
        
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) {
            return true; // Si no hay roles definidos, permite el acceso
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Verifica si el usuario tiene uno de los roles necesarios
        if (!user || !roles.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
