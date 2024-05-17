import {
    Inject,
    Injectable,
    Logger,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    // 创建 logger 对象
    private logger = new Logger();

    // 注入 Repository<User>
    // 这里注入 Repository 需要在 UserModule 里引入下 TypeOrm.forFeature
    @InjectRepository(User)
    private userRepository: Repository<User>;

    @Inject(RedisService)
    private redisService: RedisService; 

    async register(user: RegisterUserDto) {
        const captcha = await this.redisService.get(`captcha_${user.email}`);

        if (!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }

        if (user.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        }

        const foundUser = await this.userRepository.findOneBy({
            username: user.username
        });

        if (foundUser) {
            throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
        }

        const newUser = new User();
        newUser.username = user.username;
        newUser.password = md5(user.password);
        newUser.email = user.email;
        newUser.nickName = user.nickName;

        try {
            await this.userRepository.save(newUser);

            return '注册成功';
        }
        catch(e) {
            this.logger.error(e, UserService);
                return '注册失败';
            }
    }
}
