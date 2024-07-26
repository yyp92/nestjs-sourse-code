import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './log.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,

        // 全局启用路由守卫
        // {
        //     provide: APP_GUARD,
        //     useClass: LoginGuard
        // }
          
        // 全局启用拦截器
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: TimeInterceptor
        // }

        // 全局启用 Pipe
        // {
        //     provide: APP_PIPE,
        //     useClass: ValidatePipe
        // }

        // 全局启用 ExceptionFilter
        // {
        //     provide: APP_FILTER,
        //     useClass: TestFilter
        // }
    ],
})
export class AppModule implements NestModule {
    // * 在 configure 方法里配置 LogMiddleware 在哪些路由生效
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogMiddleware).forRoutes('aaa*')
    }
}
