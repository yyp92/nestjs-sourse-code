import { Controller, Get, Post, Body, Query, Patch, Param, Delete, Put, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import * as path from 'path'
import { FileInterceptor } from '@nestjs/platform-express';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {storage} from './my-file-storage'


@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get('list')
    async list(@Query('name') name: string) {
        return this.bookService.list(name);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.bookService.findById(+id);
    }

    @Post('create')
    async create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Put('update')
    async update(@Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(updateBookDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        return this.bookService.delete(+id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        // dest 是保存文件的目录
        dest: 'uploads',

        storage: storage,

        // limits 是文件大小限制，限制为 3 M
        limits: {
            fileSize: 1024 * 1024 * 3
        },

        // fileFilter 限制扩展名只能是图片
        fileFilter(req, file, callback) {
            const extname = path.extname(file.originalname);

            if (['.png', '.jpg', '.gif'].includes(extname)) {
                callback(null, true);
            }
            else {
                callback(new BadRequestException('只能上传图片'), false);
            }
        }
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log('file', file);
        return file.path;
    }
}
