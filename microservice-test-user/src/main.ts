/**
 * * 微服务不需要暴露 http 接口，只需要支持微服务的通信就行。
 */
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    // await app.listen(3000);

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            // 用 TCP 方式通信
            transport: Transport.TCP,
            options: {
                port: 8888,
            },
        },
    )
    app.listen()
}
bootstrap();
