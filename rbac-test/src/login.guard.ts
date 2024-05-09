import {
    CanActivate,
    ExecutionContext,
    Inject, 
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from './user/entities/role.entity';

// 因为 typescript 里同名 module 和 interface 会自动合并，可以这样扩展类型
declare module 'express' {
    interface Request {
        user: {
            username: string;
            roles: Role[]
        }
    }
}

@Injectable()
export class LoginGuard implements CanActivate {
    @Inject()
    private reflector: Reflector;

    @Inject(JwtService)
    private jwtService: JwtService;
    
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const requireLogin = this.reflector.getAllAndOverride(
            'require-login',
            [
                context.getClass(),
                context.getHandler()
            ]
        );
          
        console.log(requireLogin)
        
        // 如果目标 handler 或者 controller 不包含 require-login 的 metadata，那就放行，否则才检查 jwt。
        if (!requireLogin) {
            return true;
        }

        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedException('用户未登录');
        }

        try {
            const token = authorization.split(' ')[1];
            const data = this.jwtService.verify(token);
            request.user = data.user

            return true;
        }
        catch(e) {
            throw new UnauthorizedException('token 失效，请重新登录');
        }
    }
}

