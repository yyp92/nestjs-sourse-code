/**
 * * 登录鉴权
 */
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
import { UnLoginException, UnloginFilter } from './unlogin.filter';
import { Permission } from './user/entities/permission.entity';

interface JwtUserData {
    userId: number;
    username: string;
    roles: string[];
    permissions: Permission[]
}

declare module 'express' {
    interface Request {
        user: JwtUserData
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
        
        // 用 reflector 从目标 controller 和 handler 上拿到 require-login 的 metadata
        const requireLogin = this.reflector.getAllAndOverride(
            'require-login',
            [
                context.getClass(),
                context.getHandler()
            ]
        );

        // 如果没有 metadata，就是不需要登录，返回 true 放行
        if (!requireLogin) {
            return true;
        }
        
        // 否则从 authorization 的 header 取出 jwt 来
        const authorization = request.headers.authorization;

        // 如果 jwt 无效，返回 401 响应，提示 token 失效，请重新登录
        if (!authorization) {
            // throw new UnauthorizedException('用户未登录');
            throw new UnLoginException()
        }

        // 把用户信息设置到 request，然后放行
        try {
            const token = authorization.split(' ')[1];
            const data = this.jwtService.verify<JwtUserData>(token);

            request.user = {
                userId: data.userId,
                username: data.username,
                roles: data.roles,
                permissions: data.permissions
            }

            return true;
        }
        catch(e) {
            throw new UnauthorizedException('token 失效，请重新登录');
        }
    }
}
