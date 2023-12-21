import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, HttpException } from '@nestjs/common';
import { NestMulterUploadService } from './nest-multer-upload.service';
import { CreateNestMulterUploadDto } from './dto/create-nest-multer-upload.dto';
import { UpdateNestMulterUploadDto } from './dto/update-nest-multer-upload.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {storage} from './storage'
import { FileSizeValidationPipePipe } from './pipe/file-size-validation-pipe.pipe';
import { MyFileValidator } from './MyFileValidator';

@Controller('nest-multer-upload')
export class NestMulterUploadController {
    constructor(private readonly nestMulterUploadService: NestMulterUploadService) {}

    @Get()
    getHello() {
        return this.nestMulterUploadService.getHello()
    }

    @Post('aa')
    @UseInterceptors(FileInterceptor('aa', {
        dest: 'uploads'
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
        console.log('body', body);
        console.log('file', file);
    }

    @Post('bb')
    @UseInterceptors(FilesInterceptor('bb', 3, {
        dest: 'uploads'
    }))
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
        console.log('body', body);
        console.log('files', files);
    }

    @Post('cc')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'aa', maxCount: 2 },
        { name: 'bb', maxCount: 3 },
    ], {
        dest: 'uploads'
    }))
    uploadFileFields(@UploadedFiles() files: { aa?: Express.Multer.File[], bb?: Express.Multer.File[] }, @Body() body) {
        console.log('body', body);
        console.log('files', files);
    }

    @Post('dd')
    @UseInterceptors(AnyFilesInterceptor({
        // dest: 'uploads'
        storage: storage
    }))
    uploadAnyFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
        console.log('body', body);
        console.log('files', files);
    }

    @Post('ee')
    @UseInterceptors(FileInterceptor('aa', {
        dest: 'uploads'
    }))
    uploadFilesLimitSize(@UploadedFile(FileSizeValidationPipePipe) file: Express.Multer.File, @Body() body) {
        console.log('body', body);
        console.log('file-limit', file);
    }

    @Post('ff')
    @UseInterceptors(FileInterceptor('aa', {
        dest: 'uploads'
    }))
    uploadFile3(@UploadedFile(new ParseFilePipe({
        // 自己定义错误信息
        // exceptionFactory: err => {
        //     throw new HttpException('xxx' + err, 404)
        // },
        validators: [
            new MaxFileSizeValidator({ maxSize: 500 }),
            new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
    })) file: Express.Multer.File, @Body() body) {
        console.log('body', body);
        console.log('file', file);
    }

    @Post('hh')
    @UseInterceptors(FileInterceptor('aa', {
        dest: 'uploads'
    }))
    uploadFile4(@UploadedFile(new ParseFilePipe({
        validators: [
            new MyFileValidator({})
        ],
    })) file: Express.Multer.File, @Body() body) {
        console.log('body', body)
        console.log('file', file)
    }
}
