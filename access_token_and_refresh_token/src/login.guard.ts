import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
    @Inject(JwtService)
    private jwtService: JwtService;

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedException('用户未登录');
        }

        try { 
            // 取出 authorization header 中的 jwt token，这个就是 access_token，对它做校验
            const token = authorization.split(' ')[1];
            const data = this.jwtService.verify(token);

            return true;
        }
        catch(e) {
            throw new UnauthorizedException('token 失效，请重新登录');
        }
    }
}
