import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { generateRandomStr } from './utils';
import { UniqueCode } from './entities/UniqueCode';


@Injectable()
export class UniqueCodeService {
    @InjectEntityManager()
    private entityManager: EntityManager;
 
    // @Cron(CronExpression.EVERY_5_SECONDS)
    async generateCode() {
        // 生成随机的长度为 6 的字符串
        let str = generateRandomStr(6);

        // 查下数据库
        const uniqueCode = await this.entityManager.findOneBy(
            UniqueCode,
            {
                code: str
            }
        );

        // 如果没查到，就插入数据
        if (!uniqueCode) {
            const code = new UniqueCode();
            code.code = str;
            code.status = 0;

            return await this.entityManager.insert(UniqueCode, code);
        }
        // 否则重新生成
        else {
            return this.generateCode();
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_4AM)
    async batchGenerateCode() {
        for (let i = 0; i< 10000; i++) {
            this.generateCode();
        }
    }
}
