import {LoggerService, LogLevel, ConsoleLogger} from '@nestjs/common';
import {createLogger, format, Logger, transports} from 'winston'
// chalk 来打印颜色
import * as chalk from 'chalk';
// dayjs 格式化日期
import * as dayjs from 'dayjs';


export class MyLogger implements LoggerService {
    private logger: Logger;

    constructor(options) {
        this.logger = createLogger(options)
    }

    log(message: string, context: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        this.logger.log('info', message, { context, time });
    }

    error(message: string, context: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        this.logger.log('info', message, { context, time });
    }

    warn(message: string, context: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        this.logger.log('info', message, { context, time });
    }
}
