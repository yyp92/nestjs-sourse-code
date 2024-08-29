import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
    @Inject('REDIS_CLIENT')
    private redisClient: RedisClientType

    async keys(pattern: string) {
        return await this.redisClient.keys(pattern)
    }

    async get(key: string) {
        return await this.redisClient.get(key)
    }

    async set(key: string, value: string | number, ttl?: number) {
        await this.redisClient.set(key, value)

        if (ttl) {
            await this.redisClient.expire(key, ttl)
        }
    }

    // zRankingList 查询排行榜成员，加上 REV 是按分数从大到小排
    async zRankingList(key: string, start: number = 0, end: number = -1) {
        return this.redisClient.zRange(key, start, end, {
            REV: true
        })
    }

    async zAdd(key: string, members: Record<string, number>) {
        const mems = []

        for (let key in members) {
            mems.push({
                value: key,
                score: members[key]
            })
        }

        return await this.redisClient.zAdd(key, mems)
    }
}
