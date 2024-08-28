import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ],
    controllers: [AnswerController],
    providers: [AnswerService],
})
export class AnswerModule { }
