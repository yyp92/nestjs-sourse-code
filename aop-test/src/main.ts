import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 全局中间件
    app.use(function(req: Request, res: Response, next: NextFunction) {
        console.log('before', req.url);
        next();
        console.log('after');
    })

    // 全局启用路由守卫
    // app.useGlobalGuards(new LoginGuard())

    // 全局拦截器
    // app.useGlobalInterceptors(new TimeInterceptor())

    // 全局 pipe
    // Pipe 是管道的意思，用来对参数做一些检验和转换
    // app.useGlobalPipes(new ValidatePipe())

    // 全局 ExceptionFilter
    // app.useGlobalFilters(new TestFilter())

    await app.listen(3000);
}
bootstrap();
