import {
    Controller,
    Get,
    Post,
    Body,
    Patch, 
    Param, 
    Delete,
    Inject,
    Query,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Inject(JwtService)
    private jwtService: JwtService;

    @Post('login')
    async login(@Body() loginUser: LoginUserDto) {
        const user = await this.userService.login(loginUser);

        // access_token 里存放 userId、username
        const access_token = this.jwtService.sign(
            {
                userId: user.id,
                username: user.username,
            },
            {
                expiresIn: '30m'
            }
        );

        // refresh_token 里只存放 userId 就好了
        const refresh_token = this.jwtService.sign(
            {
                userId: user.id
            },
            {
                expiresIn: '7d'
            }
        );

        return {
            access_token,
            refresh_token
        }
    }

    @Get('refresh')
    async refresh(@Query('refresh_token') refreshToken: string) {
        // 取出 refresh_token 里的 userId，从数据库中把 user 信息查出来，然后生成新的 access_token 和 refresh_token 返回。
        try {
            const data = this.jwtService.verify(refreshToken);
            const user = await this.userService.findUserById(data.userId);

            const access_token = this.jwtService.sign(
                {
                    userId: user.id,
                    username: user.username,
                },
                {
                    expiresIn: '30m'
                }
            );

            const refresh_token = this.jwtService.sign(
                {
                    userId: user.id
                }, 
                {
                    expiresIn: '7d'
                }
            );

            return {
                access_token,
                refresh_token
            }
        }
        // 如果 jwt 校验失败，就返回 token 已失效，请重新登录
        catch(e) {
            throw new UnauthorizedException('token 已失效，请重新登录');
        }
    }
}
