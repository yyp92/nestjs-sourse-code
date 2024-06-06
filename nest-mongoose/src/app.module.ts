import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogModule } from './dog/dog.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/guang'),
        DogModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
