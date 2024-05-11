import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionService } from './session/session.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Inject(SessionService)
    private sessionService: SessionService;

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('count')
    async count(@Req() req: Request | any, @Res({ passthrough: true}) res: Response | any) {
        const sid = req.cookies?.sid;

        // 因为 redis 虽然可以存整数、浮点数，但是它会转为 string 来存，所以取到的是 string，需要自己转换一下。
        // 先根据 cookie 的 sid 调用 getSession 取 session。
        const session = await this.sessionService.getSession<{count: string}>(sid);

        // 拿到的如果有 count，就 + 1 之后放回去，没有就设置 1
        const curCount = session.count ? parseInt(session.count) + 1 : 1;
        // 然后 setSession 更新 session。
        const curSid = await this.sessionService.setSession(
            sid,
            {
                count: curCount
            }
        );

        res.cookie('sid', curSid, { maxAge: 1800000 });

        return curCount;
    }
}
