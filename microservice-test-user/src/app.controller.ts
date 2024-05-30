/**
 * 如果那边是 @MessagePattern 声明的方法，这边要用 send 方法调用。
 * 而 @EventPattern 声明的方法，这边要用 emit 方法调用
 */
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    // 用 @MessagePattern 声明的要处理的消息
    @MessagePattern('sum')
    sum(numArr: Array<number>): number {
        return numArr.reduce((total, item) => total + item, 0)
    }

    // 如果并不需要返回消息的话，可以用 @EventPattern 声明
    @EventPattern('log')
    log(str: string) {
        console.log(str)
    }
}
