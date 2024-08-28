import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@app/prisma'
import { RedisModule } from '@app/redis';
import { EmailModule } from '@app/email';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, CommonModule } from '@app/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        RedisModule,
        PrismaModule,
        EmailModule,
        JwtModule.registerAsync({
            global: true,
            useFactory() {
                return {
                    secret: 'guang',
                    signOptions: {
                        // 默认 30 分钟
                        expiresIn: '30m' 
                    }
                }
            }
        }),
        CommonModule
    ],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
})
export class UserModule { }
