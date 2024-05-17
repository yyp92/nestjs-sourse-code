import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

@Global()
@Module({
    providers: [
        RedisService,

        {
            provide: 'REDIS_CLIENT',
            async useFactory() {
                const client = createClient({
                    socket: {
                        host: 'localhost',
                        port: 6379
                    },

                    // redis 的 database 就是一个命名空间的概念
                    database: 1
                });
                await client.connect();

                return client;
            }
        }
    ],
    exports: [RedisService]
})
export class RedisModule {}
