import { Controller, Post, Body, Inject, Get, Query, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Inject(EmailService)
    private emailService: EmailService;

    @Inject(RedisService)
    private redisService: RedisService;

    @Inject(JwtService)
    private jwtService: JwtService;

    // 注册
    @Post('register')
    async register(@Body() registerUser: RegisterUserDto) {
        return await this.userService.register(registerUser);
    }

    // 注册 - 发送验证码
    @Get('register-captcha')
    async captcha(@Query('address') address: string) {
        const code = Math.random().toString().slice(2, 8);

        await this.redisService.set(`captcha_${address}`, code, 5 * 60);

        await this.emailService.sendMail({
            to: address,
            subject: '注册验证码',
            html: `<p>你的注册验证码是 ${code}</p>`
        });

        return '发送成功';
    }

    // 登录
    @Post('login')
    async userLogin(@Body() loginUser: LoginUserDto) {
        const user = await this.userService.login(loginUser);

        return {
            user,
            token: this.jwtService.sign(
                {
                    userId: user.id,
                    username: user.username
                },
                {
                    expiresIn: '7d'
                }
            )
        }
    }

    // 获取个人信息
    @Get('info')
    @RequireLogin()
    async info(@UserInfo('userId') userId: number) {
        return this.userService.findUserDetailById(userId)
    }

    // 修改密码
    @Post('update_password')
    async updatePassword(@Body() passwordDto: UpdateUserPasswordDto) {
        return this.userService.updatePassword(passwordDto);
    }

    // 修改密码 - 发送验证码
    @Get('update_password/captcha')
    async updatePasswordCaptcha(@Query('address') address: string) {
        if (!address) {
            throw new BadRequestException('邮箱地址不能为空')
        }

        const code = Math.random().toString().slice(2, 8)

        await this.redisService.set(`update_password_captcha_${address}`, code, 10 * 60)

        await this.emailService.sendMail({
            to: address,
            subject: '更改密码验证码',
            html: `<p>你的更改密码验证码是 ${code}</p>`
        })

        return '发送成功'
    }

    // 修改个人信息
    @Post('update')
    @RequireLogin()
    async update(@UserInfo('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(userId, updateUserDto)
    }


    // 修改个人信息 - 发送证码码
    // 这个接口是登录之后才能访问的，我们从 request.user 中取出 userId，查询下 email 来发送邮件。
    @Get('update/captcha')
    @RequireLogin()
    async updateCaptcha(@UserInfo('userId') userId: number) {
        const { email: address } = await this.userService.findUserDetailById(userId)

        const code = Math.random().toString().slice(2, 8)

        await this.redisService.set(`update_user_captcha_${address}`, code, 10 * 60)

        await this.emailService.sendMail({
            to: address,
            subject: '更改用户信息验证码',
            html: `<p>你的验证码是 ${code}</p>`
        })

        return '发送成功'
    }
}
