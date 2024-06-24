import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entities/article.entity';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.join(__dirname, '.env')
        }),
        // TypeOrmModule.forRoot({
        //     type: "mysql",
        //     host: "localhost",
        //     port: 3306,
        //     username: "root",
        //     password: "123456",
        //     database: "nest-migration-test",
        //     synchronize: false,
        //     logging: true,
        //     entities: [Article],
        //     poolSize: 10,
        //     connectorPackage: 'mysql2',
        //     extra: {
        //         authPlugin: 'sha256_password',
        //     }
        // }),

        TypeOrmModule.forRootAsync({
            useFactory(configService: ConfigService) {
                return {
                    type: "mysql",
                    host: configService.get('mysql_server_host'),
                    port: configService.get('mysql_server_port'),
                    username: configService.get('mysql_server_username'),
                    password: configService.get('mysql_server_password'),
                    database: configService.get('mysql_server_database'),
                    synchronize: false,
                    logging: true,
                    entities: [Article],
                    poolSize: 10,
                    connectorPackage: 'mysql2',
                    extra: {
                        authPlugin: 'sha256_password',
                    }
                }
            },
            inject: [ConfigService]
        }),
        ArticleModule,  
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
