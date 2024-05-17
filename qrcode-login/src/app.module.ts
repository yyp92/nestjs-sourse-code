import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'guang'
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
