import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Job } from './entities/Job';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "123456",
            database: "boss_spider",
            synchronize: true,
            logging: true,
            entities: [Job],
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
