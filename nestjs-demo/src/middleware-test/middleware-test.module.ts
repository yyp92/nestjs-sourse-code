/**
 * Nest 的中间件
 */


import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MiddlewareTestService } from './middleware-test.service';
import { MiddlewareTestController } from './middleware-test.controller';
import { AaMiddleware } from './middleware/aa.middleware';

@Module({
    imports: [],
    controllers: [MiddlewareTestController],
    providers: [MiddlewareTestService],
})
export class MiddlewareTestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AaMiddleware).forRoutes('*')

        // consumer.apply(AaMiddleware).forRoutes({ path: 'middleware-test/hello*', method: RequestMethod.GET });
        // consumer.apply(AaMiddleware).forRoutes({ path: 'middleware-test/world2', method: RequestMethod.GET });
    }
}
