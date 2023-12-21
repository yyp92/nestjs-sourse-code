import { Module } from '@nestjs/common';
import { LoggerTestService } from './logger-test.service';
import { LoggerTestController } from './logger-test.controller';
import { MyLogger3 } from './log/MyLogger3';
import { LoggerModule } from './logger/logger.module';
import { Logger2Module } from './logger2/logger.module';
import { AaaModule } from './aaa/aaa.module';

@Module({
    controllers: [LoggerTestController],
    providers: [LoggerTestService, MyLogger3],
    imports: [
        LoggerModule,
        AaaModule,
        Logger2Module.register({
            xxx: 1,
            yyy: 2
        })
    ],
})
export class LoggerTestModule {}
