import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'BOOK_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    url: 'localhost:8888',
                    package: 'book',
                    protoPath: join(__dirname, 'book/book.proto'),
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
