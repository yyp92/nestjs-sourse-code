import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    @InjectEntityManager()
    private entityManager: EntityManager;

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    async login(loginUser: LoginUserDto) {
        const user = await this.entityManager.findOne(
            User,
            {
                where: {
                    username: loginUser.username
                }
            }
        );
    
        if (!user) {
            throw new BadRequestException('用户不存在');
        }
    
        if (user.password !== loginUser.password) {
            throw new BadRequestException('密码错误');
        }
    
        return user;
    }
}
