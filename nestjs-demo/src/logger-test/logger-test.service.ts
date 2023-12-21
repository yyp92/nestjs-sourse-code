import { Inject, Injectable } from '@nestjs/common';
import { CreateLoggerTestDto } from './dto/create-logger-test.dto';
import { UpdateLoggerTestDto } from './dto/update-logger-test.dto';
import { MyLogger } from './logger2/MyLogger';

@Injectable()
export class LoggerTestService {
    @Inject(MyLogger)
    private logger: MyLogger;

    getHello(): string {
        this.logger.log('yyy', LoggerTestService.name)

        return 'LoggerTestService'
    }
}
