import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
    imports: [RedisModule],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailModule {}
