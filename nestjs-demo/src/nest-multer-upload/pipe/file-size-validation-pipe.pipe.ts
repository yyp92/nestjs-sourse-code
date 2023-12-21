import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipePipe implements PipeTransform {
    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        console.log('----value', value)
        if (value.size > 5 * 1024) {
            throw new HttpException('文件大于 10k', HttpStatus.BAD_REQUEST);
        }

        return value;
    }
}
