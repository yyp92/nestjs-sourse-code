import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "123456",
            database: "google-login",
            synchronize: true,
            logging: true,
            entities: [User],
            poolSize: 10,
            connectorPackage: 'mysql2',
            extra: {
                authPlugin: 'sha256_password',
            }
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
