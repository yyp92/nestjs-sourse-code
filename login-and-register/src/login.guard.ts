/**
 * * 鉴权
 */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  Logger
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
    @Inject(JwtService)
    private jwtService: JwtService;

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // 取出 authorization 的 header
        const request: Request = context.switchToHttp().getRequest();
        const authorization = request.header('authorization') || '';
        const bearer = authorization.split(' ');
        
        if (!bearer || bearer.length < 2) {
            throw new UnauthorizedException('登录 token 错误');
        }

        const token = bearer[1];

        // 验证 token 是否有效，token 有效返回 true
        try {
            const info = this.jwtService.verify(token);
            // Logger.warn(info);
            (request as any).user = info.user;

            return true;
        }
        catch(e) {
            // 无效的话就返回 UnauthorizedException
            throw new UnauthorizedException('登录 token 失效，请重新登录');
        }
    }
}
