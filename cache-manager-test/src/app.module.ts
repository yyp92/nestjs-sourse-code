import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CacheModule} from '@nestjs/cache-manager'

import {redisStore} from 'cache-manager-redis-store'
import {RedisClientOptions, createClient} from 'redis'


@Module({
    imports: [
        // 直接保存 cache-manager
        // CacheModule.register(),


        // 存在redis
        CacheModule.register<RedisClientOptions>({
            // @ts-ignore
            store: async () => redisStore({
                socket: {
                    host: 'localhost',
                    port: 6379
                },
                ttl: 60,
                database: 2
            }),
            host: 'localhost',
            port: 6379
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,

        // 自定义的provide
        {
            provide: 'REDIS_CLIENT',
            async useFactory() {
                const client = createClient({
                    socket: {
                        host: 'localhost',
                        port: 6379
                    },
                    database: 2
                })

                await client.connect()

                return client
            }
        }
    ],
})
export class AppModule {}
