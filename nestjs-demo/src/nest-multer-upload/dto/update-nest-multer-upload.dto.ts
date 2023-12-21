import { PartialType } from '@nestjs/mapped-types';
import { CreateNestMulterUploadDto } from './create-nest-multer-upload.dto';

export class UpdateNestMulterUploadDto extends PartialType(CreateNestMulterUploadDto) {}
