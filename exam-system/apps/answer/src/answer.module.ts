import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { AuthGuard, CommonModule } from '@app/common';
import { APP_GUARD } from '@nestjs/core';
import { ExcelModule } from '@app/excel';

@Module({
    imports: [
        // 在 answer 的服务里面调用下这个微服务
        // ClientsModule.register([
        //     {
        //         name: 'EXAM_SERVICE',
        //         transport: Transport.TCP,
        //         options: {
        //             port: 8888,
        //         },
        //     },
        // ])

        PrismaModule,
        CommonModule,
        ExcelModule
    ],
    controllers: [AnswerController],
    providers: [
        AnswerService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
})
export class AnswerModule { }
