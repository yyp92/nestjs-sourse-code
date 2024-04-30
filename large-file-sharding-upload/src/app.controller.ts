import {
    Controller,
    Get,
    Post,
    UseInterceptors,
    UploadedFiles,
    Body,
    Query
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 20, {
        dest: 'uploads'
    }))
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
        console.log('body', body);
        console.log('files', files);

        // 用正则匹配出文件名
        const fileName = body.name.match(/(.+)\-\d+$/)[1];
        // 在 uploads 下创建 chunks_文件名 的目录，把文件复制过去，然后删掉原始文件
        const chunkDir = 'uploads/chunks_'+ fileName;

        if (!fs.existsSync(chunkDir)) {
            fs.mkdirSync(chunkDir);
        }
        fs.cpSync(files[0].path, chunkDir + '/' + body.name);
        fs.rmSync(files[0].path);
    }

    // 合并文件
    @Get('merge')
    merge(@Query('name') name: string) {
        // 接收文件名，然后查找对应的 chunks 目录，把下面的文件读取出来，按照不同的 start 位置写入到同一个文件里
        const chunkDir = 'uploads/chunks_' + name;

        const files = fs.readdirSync(chunkDir);

        let count = 0
        let startPos = 0;
        files.map(file => {
            const filePath = chunkDir + '/' + file;
            const stream = fs.createReadStream(filePath);

            stream
                .pipe(fs.createWriteStream('uploads/' + name, {
                    start: startPos
                }))
                // 然后我们在合并完成之后把 chunks 目录删掉
                .on('finish', () => {
                    count++

                    if (count === files.length) {
                        fs.rm(
                            chunkDir,
                            {
                                recursive: true
                            },
                            () => {}
                        )
                    }
                })

            startPos += fs.statSync(filePath).size;
        })
    }
}
