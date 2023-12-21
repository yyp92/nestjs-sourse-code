/**
 * main.ts 是负责启动 Nest 的 ioc 容器的
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import { join } from 'path';
import {TestFilterFilter} from './test-filter.filter'
import { MyLogger } from './logger-test/log/MyLogger';
import { MyLogger3 } from './logger-test/log/MyLogger3';


/**
 * Express
 */
async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    // await app.listen(3000);


    // 调用下 useStaticAssets 来支持静态资源的请求
    // const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // // 指定 prefix 为 static
    // app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static'});
    // await app.listen(8000);


    /**
     * 指定渲染模板引擎
     */
    // const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // // 指定 prefix 为 static
    // app.useStaticAssets(join(__dirname, '..', 'public'));
    // // 模板路径
    // app.setBaseViewsDir(join(__dirname, '..', 'views'))
    // app.setViewEngine('hbs')
    // // app.useGlobalFilters(new TestFilterFilter())
    // await app.listen(8080);


    /**
     * 支持跨域
     */
    // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //   cors: true
    // });
    // await app.listen(8080);


    /**
     * 日志
     */
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // logger: false
        // logger: ['warn', 'error']
        // logger: new MyLogger()

        // todo app.useLogger
        // bufferLogs: true
    });
    // app.useLogger(app.get(MyLogger3))
    await app.listen(8080);
}


/**
 * Fastify
 */
// async function bootstrap() {
//   const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
//   await app.listen(8080);
// }

bootstrap();
