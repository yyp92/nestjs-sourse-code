import { Controller, Get, Inject, Query } from '@nestjs/common';
import * as Minio from 'minio';
import { AppService } from './app.service';
import { MINIO_CLIENT } from './minio/minio.module';


@Controller()
export class AppController {
    @Inject(MINIO_CLIENT)
    private minioClient: Minio.Client;

    constructor(private readonly appService: AppService) {}

    @Get('test')
    async test() {
        try {
            await this.minioClient.fPutObject('aaa', 'hello.json', './package.json');

            return 'http://localhost:9000/aaa/hello.json';
        } catch(e) {
            console.log(e);

            return '上传失败';
        }
    }

    @Get('presignedUrl')
    async presignedUrl(@Query('name') name: string) {
        return this.minioClient.presignedPutObject('aaa', name);
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
