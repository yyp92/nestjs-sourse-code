import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { LoggerTestService } from './logger-test.service';
import { CreateLoggerTestDto } from './dto/create-logger-test.dto';
import { UpdateLoggerTestDto } from './dto/update-logger-test.dto';

@Controller('logger-test')
export class LoggerTestController {
    private logger = new Logger();

    constructor(private readonly loggerTestService: LoggerTestService) {}

    @Get()
    getHello(): string {
        this.logger.debug('aaa', LoggerTestController.name);
        this.logger.error('bbb', LoggerTestController.name);
        this.logger.log('ccc', LoggerTestController.name);
        this.logger.verbose('ddd', LoggerTestController.name);
        this.logger.warn('eee', LoggerTestController.name);

        return this.loggerTestService.getHello()
    }
}
