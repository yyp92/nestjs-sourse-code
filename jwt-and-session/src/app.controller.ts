import {
    Controller,
    Get,
    Session,
    Inject,
    Res,
    Headers,
    UnauthorizedException
} from '@nestjs/common';
import {AppService} from './app.service';
import {JwtService} from '@nestjs/jwt';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Inject(JwtService)
    private jwtService: JwtService;

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('sss')
    sss(@Session() session) {
        console.log(session)
        session.count = session.count ? session.count + 1 : 1;

        return session.count;
    }

    @Get('ttt')
    ttt(
        // 通过 @Headers 装饰器取出 autorization 的 header
        @Headers('authorization') authorization: string,
        @Res({ passthrough: true}) response: Response | any
    ) {
        if (authorization) {
            try {
                // 因为authorization的格式为：Bearer xxx
                const token = authorization.split(' ')[1]
                // 通过 jwtService.verify 对它做验证
                const data = this.jwtService.verify(token)
        
                // 验证成功就重新生成 jwt 放到 header 里返回
                const newToken = this.jwtService.sign({
                    count: data.count + 1
                })

                response.setHeader('token', newToken)
                return data.count + 1
            }
            // 如果验证失败，那就抛出 UnauthorizedException 异常，让 Nest 内置的 Exception Filter 来处理。
            catch(e) {
                console.log(e)
                throw new UnauthorizedException()
            }
        }
        // 如果没有 autorization 的 header，那就生成一个 jwt 放到 header 里返回
        else {
            // 使用 jwtService.sign 来生成一个 jwt token
            const newToken = this.jwtService.sign({
                count: 1
            })

            // 放到 response header 里
            response.setHeader('token', newToken)

            return 1
        }
    }
}
