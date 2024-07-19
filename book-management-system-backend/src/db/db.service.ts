import { Inject, Injectable } from '@nestjs/common';
import { access, readFile, writeFile } from 'fs/promises';
import { DbModuleOptions } from './db.module';

@Injectable()
export class DbService {
    @Inject('OPTIONS')
    private options: DbModuleOptions;

    // read 方法就是读取文件内容，然后 JSON.parse 一下转为对象。如果文件不存在就返回孔数组
    async read() {
        const filePath  = this.options.path;

        try {
            await access(filePath)
        }
        catch(e) {
            return [];
        }

        const str = await readFile(filePath, {
            encoding: 'utf-8'
        });
        
        if (!str) {
            return []
        }

        return JSON.parse(str);
    }

    // write 方法是 JSON.stringify 之后写入文件。
    async write(obj: Record<string, any>) {
        await writeFile(
            this.options.path,
            JSON.stringify(obj || []),
            {
                encoding: 'utf-8'
            }
        )
    }
}
