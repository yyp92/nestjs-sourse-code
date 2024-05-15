import { Injectable, Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';
import { EntityManager } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
    @InjectEntityManager()
    private entityManager: EntityManager;

    @Inject(RedisService)
    private redisService: RedisService;

    create(createArticleDto: CreateArticleDto) {
        return 'This action adds a new article';
    }

    async findOne(id: number) {
        return await this.entityManager.findOneBy(
            Article,
            {
                id
            }
        );
    }

    async view(id: number, userId: string) {
        const res = await this.redisService.hashGet(`article_${id}`);

        // 先查询 redis，如果没查到就从数据库里查出来返回，并存到 redis 里
        if (res.viewCount === undefined) {
            const article = await this.findOne(id);
            article.viewCount ++;

            // await this.entityManager.save(article);
            await this.entityManager.update(Article, {  id }, {
                viewCount: article.viewCount
            });

            await this.redisService.hashSet(
                `article_${id}`,
                {
                    viewCount: article.viewCount,
                    likeCount: article.likeCount,
                    collectCount: article.collectCount
                }
            );

            await this.redisService.set(`user_${userId}_article_${id}`, 1, 10)

            return article.viewCount;
        }
        // 查到了就更新 redis 的 viewCount，直接返回 viewCount + 1
        else {
            const flag = await this.redisService.get(`user_${userId}_article_${id}`)

            if (flag) {
                return res.viewCount
            }

            await this.redisService.hashSet(
                `article_${id}`,
                {
                    ...res,
                    viewCount: +res.viewCount + 1
                }
            );

            await this.redisService.set(`user_${userId}_article_${id}`, 1, 10)

            return +res.viewCount + 1;
        }
    }

    async flushRedisToDB() {
        const keys = await this.redisService.keys(`article_*`);
        
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
      
            const res = await this.redisService.hashGet(key);
      
            const [, id] = key.split('_');
      
            await this.entityManager.update(
                Article,
                {
                    id: +id
                },
                {
                    viewCount: +res.viewCount,        
                }
            );
        }
    }
}
