import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}

    @Get('callback/google')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        /**
         * 首先根据 email 查询 google 方式登录的 user，如果有，就自动登录。
         * 否则自动注册然后登录。
         */
        const user = await this.appService.findGoogleUserByEmail(req.user.email);

        if (!user) {
            const newUser = this.appService.registerByGoogleInfo(req.user);

            return newUser;
        }
        else {
            return user;
        }
    }
}
