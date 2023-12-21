import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    arrs: string[]

    constructor(private readonly appService: AppService) {
        this.arrs = []
    }

    @Get()
    getHello(): string {
        // 测试 pm2超过一定的内存自动重启
        // const str = 'asasasssssssssssssssssssssssssssssssssssss'
        // for (let i = 0; i < 1000000; i++) {
        //     this.arrs.push(str)
        // }


        return this.appService.getHello();
    }
}
