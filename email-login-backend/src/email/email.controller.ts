import { Controller, Get, Inject, Query  } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    // 注入 RedisService，并且发送验证码之前把它存入 redis，key 为 captcha_邮箱地址
    @Inject()
    private redisService: RedisService;

    @Get('code')
    async sendEmailCode(@Query("address") address) {
        const code = Math.random().toString().slice(2, 8);

        // 这里的 captcha 就是验证码的意思
        // 过期时间为 5 分钟
        await this.redisService.set(`captcha_${address}`, code, 5 * 60);

        await this.emailService.sendMail({
            to: address,
            subject: '登录验证码',
            html: `<p>你的登录验证码是 ${code}</p>`
        });

        return '发送成功';
    }
}
