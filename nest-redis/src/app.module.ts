import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {createClient} from 'redis'


@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,

        // 添加一个自定义的 provider
        {
            provide: 'REDIS_CLIENT',

            // 通过 useFactory 的方式动态创建 provider，token 为 REDIS_CLIENT
            async useFactory() {
                const client = createClient({
                    socket: {
                        host: 'localhost',
                        port: 6379
                    }
                })

                await client.connect()

                return client
            }
        }
    ],
})
export class AppModule {}
