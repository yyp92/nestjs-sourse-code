/**
 * * 加一个 Guard 来解析 jwt
 */
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class LoginGuard implements CanActivate {
    @Inject(JwtService)
    private jwtService: JwtService

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const response: Response = context.switchToHttp().getResponse();
        // 取出 authorization header 中的 jwt token
        const authorization = request.headers.authorization

        // jwt 有效就可以继续访问，否则返回 token 失效，请重新登录。
        if (!authorization) {
            throw new UnauthorizedException('用户未登录')
        }

        try {
            const token = authorization.split(' ')[1]
            const data = this.jwtService.verify(token)

            // 但这个 token 是有过期时间的，过期了就要重新登录了，所以要刷新 token。
            response.setHeader(
                'token',
                this.jwtService.sign(
                    {
                        username: data.username
                    },
                    {
                        expiresIn: '7d'
                    }
                )
            )

            return true;
        }
        catch (e) {
            throw new UnauthorizedException('token 失效，请重新登录')
        }
    }
}
