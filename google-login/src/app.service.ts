import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user.entity';

export interface GoogleInfo {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
}

@Injectable()
export class AppService {
    @InjectEntityManager()
    entityManager: EntityManager;

    getHello(): string {
        return 'Hello World!';
    }

    // 实现了 registerByGoogleInfo 方法，根据 google 返回的信息自动注册账号
    async registerByGoogleInfo(info: GoogleInfo) {
        const user = new User();
    
        user.nickName = `${info.firstName}_${info.lastName}`;
        user.avater = info.picture;
        user.email = info.email;
        user.password = '';
        user.registerType = 2;
    
        return this.entityManager.save(User, user);
    }
    
    // 实现了 findGoogleUserByEmail 方法，可以根据 email 查询 google 注册的账号
    async findGoogleUserByEmail(email: string) {
        return this.entityManager.findOneBy(
            User,
            {
                registerType: 2,
                email
            }
        )
    }
}
