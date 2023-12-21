import { ConsoleLogger, LoggerService, LogLevel } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
    log(message: string, context: string) {
        console.log(`[${context}]`,message)
    }
}