import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        // * JwtModule 是一个动态模块，通过 register 传入 option
        // JwtModule.register({
        //     // 指定 secret，也就是加密 jwt 的密钥
        //     secret: 'guang',

        //     signOptions: {
        //         // token 过期时间 expiresIn，设置 7 天
        //         expiresIn: '7d'
        //     }
        // }),


        // * 或者是 registerAsync，然后通过 useFactory 异步拿到 option 传入
        JwtModule.registerAsync({
            async useFactory() {
                await 111;

                return {
                    secret: 'guang',
                    signOptions: {
                        // token 过期时间 expiresIn，设置 7 天
                        expiresIn: '7d'
                    }
                }
            }
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
