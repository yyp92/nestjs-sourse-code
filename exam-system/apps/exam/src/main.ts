import { NestFactory } from '@nestjs/core';
import { ExamModule } from './exam.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(ExamModule)

    // exam 服务暴露了 3002 的 HTTP 服务，现在用 connectMicroservice 就是再暴露 8888 的 TCP 服务
    // app.connectMicroservice<MicroserviceOptions>({
    //     transport: Transport.TCP,
    //     options: {
    //         port: 8888,
    //     },
    // })

    app.enableCors()

    await app.listen(3002)
}
bootstrap()