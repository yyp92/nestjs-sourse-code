import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

// 使用 @Global 把这个模块声明为全局的
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
                    }
                });

                await client.connect();

                return client;
            }
        }
    ],
    exports: [RedisService]
})
export class RedisModule {}
