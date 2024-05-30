import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcServerModule } from './grpc-server.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<GrpcOptions>(GrpcServerModule, {
        // 传输方式 transport 改为 GRPC
        transport: Transport.GRPC,
        options: {
            url: 'localhost:8888',
            package: 'book',
            protoPath: join(__dirname, 'book/book.proto'),
        },
    })
    
    await app.listen()
}
bootstrap();
