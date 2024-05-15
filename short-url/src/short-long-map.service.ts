import { UniqueCodeService } from './unique-code.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ShortLongMap } from './entities/ShortLongMap';
import { UniqueCode } from './entities/UniqueCode';

@Injectable()
export class ShortLongMapService {
    @InjectEntityManager()
    private entityManager: EntityManager;

    @Inject(UniqueCodeService)
    private uniqueCodeService: UniqueCodeService;

    async generate(longUrl: string) {
        // 先从 unique-code 表里取一个压缩码来用
        let uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
            status: 0
        })

        // 如果没有可用压缩码，那就生成一个
        if (!uniqueCode) {
            uniqueCode = await this.uniqueCodeService.generateCode();
        }


        // 然后在 short-long-map 表里插入这条新的短链映射，并且把用到的压缩码状态改为 1。
        const map = new ShortLongMap();
        map.shortUrl = uniqueCode.code;
        map.longUrl = longUrl;
  
        await this.entityManager.insert(ShortLongMap, map);
        await this.entityManager.update(
            UniqueCode,
            {
                id: uniqueCode.id
            },
            {
                status: 1
            }
        );

        return uniqueCode.code;
    }

    async getLongUrl(code: string) {
        const map = await this.entityManager.findOneBy(ShortLongMap, {
            shortUrl: code
        });

        if (!map) {
            return null;
        }
        
        return map.longUrl;
    }
}
