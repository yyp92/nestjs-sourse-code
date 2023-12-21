import { Global, Module } from '@nestjs/common';
import { MyLogger } from '../log/MyLogger';

@Global()
@Module({
    providers: [MyLogger],
    exports: [MyLogger]
})
export class LoggerModule {}
