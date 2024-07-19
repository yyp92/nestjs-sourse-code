import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbModuleOptions {
    path: string
}


@Module({})
export class DbModule {
    // 在 register 方法里接收 options 参数，返回 providers、exports 等模块配置。
    // 把传入的 options 用 useValue 来声明为 provider，token 为 OPTIONS。
    static register(options: DbModuleOptions ): DynamicModule {
        return {
            module: DbModule,
            providers: [
                {
                    provide: 'OPTIONS',
                    useValue: options,
                },
                DbService,
            ],
            exports: [DbService]
        };
    }
}
