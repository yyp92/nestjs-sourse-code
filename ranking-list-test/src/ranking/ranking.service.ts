import { RedisService } from './../redis/redis.service';
import { Inject, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class RankingService {
    @Inject(RedisService)
    redisService: RedisService;

    // 格式：learning-ranking-mongth:2024-01
    private getMonthKey() {
        const dateStr = dayjs().format('YYYY-MM');

        return `learning-ranking-month:${dateStr}`;
    }

    // 格式：learning-ranking-year:2024
    private getYearKey() {
        const dateStr = dayjs().format('YYYY');

        return `learning-ranking-year:${dateStr}`;
    }

    // join 是加入自习室
    async join(name: string) {
        await this.redisService.zAdd(
            this.getMonthKey(),
            {
                [name]: 0
            }
        );
    }

    // learn 是增加学习时长
    async addLearnTime(name:string, time: number) {
        await this.redisService.zIncr(
            this.getMonthKey(),
            name,
            time
        );
    }

    // 月榜
    async getMonthRanking() {
        return this.redisService.zRankingList(
            this.getMonthKey(),
            0,
            10
        );
    }

    // 年榜
    async getYearRanking() {
        const dateStr = dayjs().format('YYYY');
        const keys = await this.redisService.keys(`learning-ranking-month:${dateStr}-*`);

        return this.redisService.zUnion(
            this.getYearKey(),
            keys
        );
    }
}
