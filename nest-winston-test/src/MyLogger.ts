import {LoggerService, LogLevel, ConsoleLogger} from '@nestjs/common';
import {createLogger, format, Logger, transports} from 'winston'
// chalk 来打印颜色
import * as chalk from 'chalk';
// dayjs 格式化日期
import * as dayjs from 'dayjs';

// export class MyLogger implements LoggerService {
//     private logger: Logger;

//     constructor() {  
//         this.logger = createLogger({
//             level: 'debug',
//             format: format.combine(
//                 format.colorize(),
//                 format.simple()
//             ),
//             transports: [
//                 new transports.Console()
//             ]
//         })
//     }

//     log(message: string, context: string) {
//         this.logger.log('info', `[${context}] ${message}`);
//     }

//     error(message: string, context: string) {
//         this.logger.log('error', `[${context}] ${message}`);
//     }

//     warn(message: string, context: string) {
//         this.logger.log('warn', `[${context}] ${message}`);
//     }
// }





export class MyLogger implements LoggerService {
    private logger: Logger;

    constructor(options) {
        this.logger = createLogger({
            level: 'debug',
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.printf(({context, level, message, time}) => {
                            const appStr = chalk.green(`[NEST]`);
                            const contextStr = chalk.yellow(`[${context}]`);
        
                            return `${appStr} ${time} ${level} ${contextStr} ${message} `;
                        })
                    ),
                }),

                new transports.File({
                    format: format.combine(
                        format.timestamp(),
                        format.json()
                    ),
                    filename: '111.log',
                    dirname: 'log'
                })
            ]
        })
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
