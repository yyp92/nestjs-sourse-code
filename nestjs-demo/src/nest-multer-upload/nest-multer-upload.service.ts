import { Injectable } from '@nestjs/common';
import { CreateNestMulterUploadDto } from './dto/create-nest-multer-upload.dto';
import { UpdateNestMulterUploadDto } from './dto/update-nest-multer-upload.dto';

@Injectable()
export class NestMulterUploadService {
    getHello() {
        return 'NestMulterUploadService'
    }
}
