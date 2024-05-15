import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { EmailModule } from './email/email.module';

@Module({
    imports: [
        EventEmitterModule.forRoot({
            // wildcard 是允许通配符 *
            wildcard: true,

            // delimiter 是 namespace 和事件名的分隔符
            delimiter: '.'
        }),
        AaaModule,
        BbbModule,
        UserModule,
        NotificationModule,
        EmailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
