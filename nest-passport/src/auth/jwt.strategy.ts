/**
 * * JWT 的认证：
 * 登录的时候通过用户名、密码认证，这时候登录认证成功会返回 jwt，然后再次访问会在 Authorization 的 header 携带 jwt，然后通过 header 的 jwt 来认证。
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'guang',
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.userId,
            username: payload.username
        };
    }
}
