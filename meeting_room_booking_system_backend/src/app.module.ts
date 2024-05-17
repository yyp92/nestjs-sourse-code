import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './permission.guard';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('jwt_secret'),
                    signOptions: {
                        // 默认 30 分钟
                        expiresIn: '30m' 
                    }
                }
            },
            inject: [ConfigService]
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'src/.env'
        }),
        TypeOrmModule.forRootAsync({
            useFactory(configService: ConfigService) {
                return {
                  type: "mysql",
                  host: configService.get('mysql_server_host'),
                  port: configService.get('mysql_server_port'),
                  username: configService.get('mysql_server_username'),
                  password: configService.get('mysql_server_password'),
                  database: configService.get('mysql_server_database'),
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
                }
              },
              inject: [ConfigService]
        }),
        UserModule,
        RedisModule,
        EmailModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: LoginGuard
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard
        },
    ],
})
export class AppModule {}
