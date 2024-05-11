import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SessionService {
    @Inject(RedisService)
    private redisService: RedisService;

    // setSession 就是用 sid_xx 的 key 在 redis 里创建 string 的数据结构。
    // setSession 的时候如果没有传入 sid，则随机生成一个，并返回 sid。
    async setSession(sid: string, value: Record<string, any>, ttl: number = 30 * 60) {
        if (!sid) {
            sid = this.generateSid();
        }

        await this.redisService.hashSet(`sid_${sid}`, value, ttl);

        return sid;
    }

    // getSession 是用 sid_xx 从 redis 取值。
    async getSession<SessionType extends Record<string,any>>(sid: string): Promise<SessionType>;
    async getSession(sid: string) {
        return await this.redisService.hashGet(`sid_${sid}`);
    }

    // generateSid 是生成随机的 session id
    generateSid() {
        return Math.random().toString().slice(2, 12);
    }
}
