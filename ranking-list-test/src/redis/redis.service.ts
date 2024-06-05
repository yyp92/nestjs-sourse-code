import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
    @Inject('REDIS_CLIENT') 
    private redisClient: RedisClientType;

    // zRange 只会返回成员名，我们顺带把分数也取出来
    async zRankingList(
        key: string,
        start: number = 0,
        end: number = -1
    ) {
        const keys = await this.redisClient.zRange(
            key,
            start,
            end,
            {
                REV: true
            }
        );

        const rankingList = {};

        for (let i = 0; i < keys.length; i++) {
            rankingList[keys[i]] = await this.zScore(key, keys[i]);
        }

        return rankingList;
    }

    // 往集合中添加成员
    async zAdd(
        key: string,
        members: Record<string, number>
    ) {
        const mems = [];

        for (let key in members) {
            mems.push({
                value: key,
                score: members[key]
            });        
        }

        return  await this.redisClient.zAdd(key, mems);
    }

    // 某个成员的分数
    async zScore(
        key: string,
        member: string
    ) {
        return  await this.redisClient.zScore(key, member);
    }

    // 成员在集合中的排名
    async zRank(
        key: string,
        member: string
    ) {
        return  await this.redisClient.zRank(key, member);
    }

    // 增加某个成员的分数
    async zIncr(
        key: string,
        member: string,
        increment: number
    ) {
        return  await this.redisClient.zIncrBy(
            key,
            increment,
            member
        )
    }

    // zUnion 要做下边界的处理，如果只传了一个 set 的名字，就染回这个 set 的内容，否则才合并
    async zUnion(
        newKey: string,
        keys: string[]
    ) {
        if (!keys.length) {
            return []
        };

        if (keys.length === 1) {
            return this.zRankingList(keys[0]);
        }

        await this.redisClient.zUnionStore(newKey, keys);

        return this.zRankingList(newKey);
    }

    async keys(pattern: string) {
        return this.redisClient.keys(pattern);    
    }
}
