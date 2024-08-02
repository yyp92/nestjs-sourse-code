import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, UserInfo } from './custom.decorator';

@Controller()
@RequireLogin()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('aaa')
    // @SetMetadata('require-login', true)
    @RequireLogin()
    aaa(@UserInfo() userInfo, @UserInfo('username') username) {
        console.log(userInfo, username);

        return 'aaa';
    }

    @Get('bbb')
    bbb() {
        return 'bbb';
    }
}
