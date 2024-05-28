import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

@Global()
@Module({
    providers: [
        RedisService,

        {
            provide: 'REDIS_CLIENT',
            async useFactory(configService: ConfigService) {
                const client = createClient({
                    socket: {
                        host: configService.get('redis_server_host'),
                        port: configService.get('redis_server_port'),
                        connectTimeout: 30000,
                    },

                    // redis 的 database 就是一个命名空间的概念
                    database: configService.get('redis_server_db'),
                });
                await client.connect();

                return client;
            },

            // 在 RedisModule 里注入 ConfigService 来读取配置
            inject: [ConfigService]
        }
    ],
    exports: [RedisService]
})
export class RedisModule {}
