import { Module, ValidationPipe } from '@nestjs/common';
import { PipeTestService } from './pipe-test.service';
import { PipeTestController } from './pipe-test.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
    controllers: [PipeTestController],
    providers: [
        PipeTestService,

        {
            provide: 'validation_options',
            useFactory() {
                return {
                    aa: 1,
                    bb: 2
                }
            }
        },

        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ],
})
export class PipeTestModule {}
