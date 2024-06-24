import { Controller, Get, Inject, Query } from '@nestjs/common';
import * as Minio from 'minio';

@Controller('minio')
export class MinioController {
    @Inject('MINIO_CLIENT')
    private minioClient: Minio.Client;

    @Get('presignedUrl') 
    presignedPutObject(@Query('name') name: string) {
        // presignedPutObject 第一个参数是 buckectName，第二个参数是 objectName，第三个参数是 expires。
        // bucketName 就是 meeting-room-booking-system，这个也可以抽到 .env 文件里，用 configService 读取。
        // objectName 需要上传文件的时候拿到 file.name 作为参数传入。
        // expires 是过期时间，我们指定 3600 秒，也就是一小时。
        return this.minioClient.presignedPutObject('meeting-room-booking-system', name, 3600);
    }
}

