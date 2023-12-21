import { Module } from '@nestjs/common';
import { NestMulterUploadService } from './nest-multer-upload.service';
import { NestMulterUploadController } from './nest-multer-upload.controller';

@Module({
    controllers: [NestMulterUploadController],
    providers: [NestMulterUploadService],
})
export class NestMulterUploadModule {}
