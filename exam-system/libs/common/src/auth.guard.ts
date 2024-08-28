import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

interface JwtUserData {
    userId: number;
    username: string;
}

declare module 'express' {
    interface Request {
        user: JwtUserData
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    @Inject()
    private reflector: Reflector;

    @Inject(JwtService)
    private jwtService: JwtService;

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const response: Response = context.switchToHttp().getResponse()

        // 用 reflector 从目标 controller 和 handler 上拿到 require-login 的 metadata
        const requireLogin = this.reflector.getAllAndOverride('require-login', [
            context.getClass(),
            context.getHandler()
        ])

        // 如果没有 metadata，就是不需要登录，返回 true 放行
        if (!requireLogin) {
            return true
        }

        // 否则从 authorization 的 header 取出 jwt 来，把用户信息设置到 request，然后放行。
        const authorization = request.headers.authorization

        if (!authorization) {
            throw new UnauthorizedException('用户未登录')
        }

        try {
            const token = authorization.split(' ')[1]
            const data = this.jwtService.verify<JwtUserData>(token)

            request.user = {
                userId: data.userId,
                username: data.username,
            }

            // token 自动续期
            response.header(
                'token',
                this.jwtService.sign(
                    {
                        userId: data.userId,
                        username: data.username
                    },
                    {
                        expiresIn: '7d'
                    }
                )
            )

            return true
        }
        // 如果 jwt 无效，返回 401 响应，提示 token 失效，请重新登录
        catch (e) {
            throw new UnauthorizedException('token 失效，请重新登录')
        }
    }
}
