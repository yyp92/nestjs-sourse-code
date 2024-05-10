
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { User } from './user/entities/user.entity';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './permission.guard';
import { RedisModule } from './redis/redis.module';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'guang',
            signOptions: {
                expiresIn: '7d'
            }
        }),

        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "123456",
            database: "rbac_test",
            synchronize: true,
            logging: true,
            entities: [
                User,
                Role,
                Permission
            ],
            poolSize: 10,
            connectorPackage: 'mysql2',
            extra: {
                authPlugin: 'sha256_password',
            }
        }),
        UserModule,
        AaaModule,
        BbbModule,
        RedisModule
    ],
    controllers: [AppController],
    providers: [
        AppService,

        // 通过 app.userGlobalXxx 的方式不能注入 provider，可以通过在 AppModule 添加 token 为 APP_XXX 的 provider 的方式来声明全局 Guard、Pipe、Intercepter 等：
        {
            provide: APP_GUARD,
            useClass: LoginGuard
        },

        {
            provide: APP_GUARD,
            useClass: PermissionGuard
        }
    ],
})
export class AppModule {}
