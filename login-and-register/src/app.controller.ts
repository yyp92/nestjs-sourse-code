import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }


    // 有一些接口是只有登录才能访问的
    @Get('aaa')
    @UseGuards(LoginGuard)
    aaa() {
        return 'aaa';
    }

    @Get('bbb')
    @UseGuards(LoginGuard)
    bbb() {
        return 'bbb';
    }
}
