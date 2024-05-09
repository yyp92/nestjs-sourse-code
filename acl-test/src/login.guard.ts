import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

// 因为默认的 session 里没有 user 的类型，所以需要扩展下
declare module 'express-session' {
    // 利用同名 interface 会自动合并的特点来扩展 Session
    interface Session {
        user: {
            username: string
        }
    }
}

@Injectable()
export class LoginGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
    
        if (!request.session?.user) {
            throw new UnauthorizedException('用户未登录');
        }

        return true;
    }
}
