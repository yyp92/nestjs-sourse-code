import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        super({
            // 这里的 clientID 和 clientSecret 要换成你自己的。
            clientID: '自己 github 生成的 clientID',
            clientSecret: '自己 github 生成的 clientSecret',

            // callbackURL 是登录成功后回调的 url
            callbackURL: 'http://localhost:3000/callback',

            // scope 是请求的数据的范围。
            scope: ['public_profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        return profile;
    }
}
