import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
// Crypto 模块来生成随机数
import * as crypto from 'crypto';
import {RegisterDto} from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {User} from './entities/user.entity';

function md5(str) {
    const hash = crypto.createHash('md5')
    hash.update(str)

    return hash.digest('hex')
}

@Injectable()
export class UserService {
    private logger = new Logger();

    @InjectRepository(User)
    private userRepository: Repository<User>;

    async register(user: RegisterDto) {
        const foundUser = await this.userRepository.findOneBy({
            username: user.username
        })

        // 先根据 username 查找下，如果找到了，说明用户已存在
        if (foundUser) {
            // 抛一个 HttpException 让 exception filter 处理
            throw new HttpException('用户已存在', 200)
        }

        // 否则，创建 User 对象，调用 userRepository 的 save 方法保存
        const newUser = new User()
        newUser.username = user.username
        // password 需要加密，这里使用 node 内置的 crypto 包来实现
        newUser.password = md5(user.password)

        try {
            await this.userRepository.save(newUser)

            return '注册成功'
        }
        catch(e) {
            this.logger.error(e, UserService)

            return '注册失败'
        }
    }

    async login(user: LoginDto) {
        const foundUser = await this.userRepository.findOneBy({
            username: user.username,
        })
    
        if (!foundUser) {
            throw new HttpException('用户名不存在', 200)
        }

        if (foundUser.password !== md5(user.password)) {
            throw new HttpException('密码错误', 200)
        }

        return foundUser
    }
}
