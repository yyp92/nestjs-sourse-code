import { PrismaService } from '@app/prisma';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@app/redis';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
    private logger = new Logger();

    @Inject(PrismaService)
    private prismaService: PrismaService

    @Inject(RedisService)
    private redisService: RedisService;

    async register(user: RegisterUserDto) {
        const captcha = await this.redisService.get(`captcha_${user.email}`)
        console.log('captcha', captcha, user)

        if (!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST)
        }

        if (user.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST)
        }

        const foundUser = await this.prismaService.user.findUnique({
            where: {
                username: user.username
            }
        })

        if (foundUser) {
            throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
        }

        try {
            return await this.prismaService.user.create({
                data: {
                    username: user.username,
                    password: user.password,
                    email: user.email
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createTime: true
                }
            })
        }
        catch (e) {
            this.logger.error(e, UserService)

            return null
        }
    }
}
