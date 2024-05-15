import {
    Controller, 
    Get,
    Sse,
} from '@nestjs/common';
import { exec } from 'child_process';
import { Observable } from 'rxjs';
import { readFileSync } from 'fs';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
       return this.appService.getHello();
    }

    // 通过 @Sse 标识这是一个 event stream 类型的接口
    @Sse('stream')
    stream() {
        // 返回的是一个 Observable 对象，然后内部用 observer.next 返回消息
        return new Observable((observer) => {
            observer.next({
                data: {
                    msg: 'aaa'
                }
            });

            setTimeout(() => {
                observer.next({
                    data: {
                        msg: 'bbb'
                    }
                });
            }, 2000);

            setTimeout(() => {
                observer.next({
                    data: {
                        msg: 'ccc'
                    }
                });
            }, 5000);
        });
    }

    @Sse('stream2')
    stream2() {
        const childProcess = exec('tail -f ./log');

        return new Observable((observer) => {
            childProcess.stdout.on('data', (msg) => {
                observer.next({
                    data: {
                        msg: msg.toString()
                    }
                });
            })

            childProcess.stderr.on('data', (err) => {
                observer.error(err.toString());
            });
        });
    }

    @Sse('stream3')
    stream3() {
        return new Observable((observer) => {
            const json = readFileSync('./package.json').toJSON();
            observer.next({ data: { msg: json }});
        });
    }
}
