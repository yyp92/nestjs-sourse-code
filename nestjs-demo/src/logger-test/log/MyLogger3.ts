import { Inject } from '@nestjs/common';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LoggerTestService } from '../logger-test.service';


@Injectable()
export class MyLogger3 extends ConsoleLogger{
    @Inject(LoggerTestService)
    private loggerTestService: LoggerTestService;

    log(message, context) {
        console.log(this.loggerTestService.getHello());
        console.log(`[${context}]`, message);
        console.log('--------------')
    }
}