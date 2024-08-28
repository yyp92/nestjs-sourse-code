import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {PrismaModule} from '@app/prisma'
import { RedisModule } from '@app/redis';
import { EmailModule } from '@app/email';

@Module({
    imports: [
        RedisModule,
        PrismaModule,
        EmailModule
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
