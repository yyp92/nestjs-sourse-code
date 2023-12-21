/**
 * RxJS 和 Interceptor
 */


import { Module } from '@nestjs/common';
import { InterceptorTestService } from './interceptor-test.service';
import { InterceptorTestController } from './interceptor-test.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AaInterceptor } from './interceptor/aa.interceptor';

@Module({
    controllers: [InterceptorTestController],
    providers: [
        InterceptorTestService,
        {
            provide: APP_INTERCEPTOR,
            useClass: AaInterceptor
        }
    ],
})
export class InterceptorTestModule {}
