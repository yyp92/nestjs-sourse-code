import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';


@Injectable()
export class UserService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    @Inject(RedisService)
    private redisService: RedisService;

    private logger = new Logger();


    async register(user: RegisterUserDto) {
        const captcha = await this.redisService.get(`captcha_${user.email}`);

        // if (!captcha) {
        //     throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        // }

        // if (user.captcha !== captcha) {
        //     throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        // }

        const foundUser = await this.prismaService.user.findUnique({
            where: {
                username: user.username
            }
        });

        if (foundUser) {
            throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.prismaService.user.create({
                data: {
                    username: user.username,
                    password: user.password,
                    nickName: user.nickName,
                    email: user.email
                },
                select: {
                    id: true,
                    username: true,
                    nickName: true,
                    email: true,
                    headPic: true,
                    createTime: true
                }
            });
        }
        catch (e) {
            this.logger.error(e, UserService);
            return null;
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const foundUser = await this.prismaService.user.findUnique({
            where: {
                username: loginUserDto.username
            }
        });

        if (!foundUser) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }

        if (foundUser.password !== loginUserDto.password) {
            throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
        }

        delete foundUser.password;

        return foundUser;
    }

    async findUserDetailById(userId: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                nickName: true,
                email: true,
                headPic: true,
                createTime: true
            }
        })

        return user;
    }

    // 先查询 redis 中相对应的验证码，检查通过之后根据 email 查询用户信息，修改密码之后 save。
    async updatePassword(passwordDto: UpdateUserPasswordDto) {
        const captcha = await this.redisService.get(`update_password_captcha_${passwordDto.email}`);

        if (!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }

        if (passwordDto.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        }

        const foundUser = await this.prismaService.user.findUnique({
            where: {
                username: passwordDto.username
            }
        });

        foundUser.password = passwordDto.password;

        try {
            await this.prismaService.user.update({
                where: {
                    id: foundUser.id
                },
                data: foundUser
            })

            return '密码修改成功'
        }
        catch (e) {
            this.logger.error(e, UserService)

            return '密码修改失败'
        }
    }

    // 根据 userId 查询用户，修改信息后 update 到数据库
    async update(userId: number, updateUserDto: UpdateUserDto) {
        const captcha = await this.redisService.get(`update_user_captcha_${updateUserDto.email}`)

        if (!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST)
        }

        if (updateUserDto.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST)
        }

        const foundUser = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        })

        if (updateUserDto.nickName) {
            foundUser.nickName = updateUserDto.nickName;
        }

        if (updateUserDto.headPic) {
            foundUser.headPic = updateUserDto.headPic;
        }

        try {
            await this.prismaService.user.update({
                where: {
                    id: userId
                },
                data: foundUser
            })

            return '用户信息修改成功'
        }
        catch (e) {
            this.logger.error(e, UserService)

            return '用户信息修改成功'
        }
    }

}
