import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(@Headers() headers): string {
        // 修改 header
        // console.log(headers)

        // 负载均衡
        console.log('access')

        return this.appService.getHello();
    }
}
