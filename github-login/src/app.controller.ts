import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller('')
export class AppController {
    constructor(private appService: AppService) {}

    // login 是触发 github 登录的
    @Get('login')
    @UseGuards(AuthGuard('github'))
    async login() {
    }

    // callback 是回调的 url
    @Get('callback')
    @UseGuards(AuthGuard('github'))
    async authCallback(@Req() req) {
        return this.appService.findUserByGithubId(req.user.id);
    }
}