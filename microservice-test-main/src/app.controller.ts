import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    // 注入的时候指定 token 为前面我们声明的微服务名字
    @Inject('USER_SERVICE')
    // 注入的对象就是连接这个微服务的客户端代理
    private userClient: ClientProxy;

    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('sum')
    calc(@Query('num') str) {
        const numArr = str.split(',').map((item) => parseInt(item))

        this.userClient.emit('log', '求和')

        // 调用它的 send 方法，第一个是消息的名字，第二个是参数
        return this.userClient.send('sum', numArr)
    }
}
