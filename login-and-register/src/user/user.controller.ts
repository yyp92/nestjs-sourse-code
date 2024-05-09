import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    Res,
    ValidationPipe 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserService} from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Inject(JwtService)
    private jwtService: JwtService;

    /**
     * login 是根据 username 和 password 取匹配是否有这个 user
     * * 对参数做校验, 这个用 ValidationPipe + class-validator 来做
     */
    @Post('login')
    async login(
        @Body(ValidationPipe) user: LoginDto,
        @Res({passthrough: true}) res: Response | any
    ) {
        const foundUser = await this.userService.login(user)

        if (foundUser) {
            // 然后在登录成功后，把 user 信息放到 jwt 通过 header 里返回
            const token = await this.jwtService.signAsync({
                user: {
                    id: foundUser.id,
                    username: foundUser.username
                }
            })
            res.setHeader('token', token)

            return 'login success';
        }
        else {
            return 'login fail';
        }
    }

    // register 是把用户信息存到数据库里
    @Post('register')
    async register(@Body(ValidationPipe) user: RegisterDto) {
        return await this.userService.register(user);
    }
}
