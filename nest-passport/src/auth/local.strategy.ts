/**
 * * 基于 passport 的登录就完成
 * 不用我们自己从 request 取 body 中的 username 和 password，也不用我们把查询结果放到 request.user 上，更不用自己实现 Guard。
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(
        username: string,
        password: string
    ) {
        const user = await this.authService.validateUser(username, password);

        return user;
    }
}