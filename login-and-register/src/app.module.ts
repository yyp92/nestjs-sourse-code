import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {User} from './user/entities/user.entity'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "123456",
            database: "login_test",
            synchronize: true,
            logging: true,
            entities: [User],
            poolSize: 10,
            connectorPackage: 'mysql2',
            extra: {
                authPlugin: 'sha256_password',
            }
        }),

        JwtModule.register({
            // global:true 声明为全局模块，这样就不用每个模块都引入它了
            global: true,

            // 指定加密密钥
            secret: 'guang',
            
            // token 过期时间
            signOptions: {
                expiresIn: '7d'
            }
        }),

        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
