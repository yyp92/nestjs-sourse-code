import { DynamicModule, Module, ModuleMetadata, Type } from '@nestjs/common';
import { Etcd3, IOptions  } from 'etcd3';
import { EtcdService } from './etcd.service';

export const ETCD_CLIENT_TOKEN = 'ETCD_CLIENT';
export const ETCD_CLIENT_OPTIONS_TOKEN = 'ETCD_CLIENT_OPTIONS';

export interface EtcdModuleAsyncOptions  {
    useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
    inject?: any[];
}

// @Module({
//     providers: [
//         EtcdService,
//         {
//             provide: 'ETCD_CLIENT',
//             useFactory() {
//                 const client = new Etcd3({
//                     hosts: 'http://localhost:2379',
//                     auth: {
//                         username: 'root',
//                         password: 'guang'
//                     }
//                 })

//                 return client
//             }
//         }
//     ],
//     exports: [
//         EtcdService
//     ]
// })
// export class EtcdModule {}

@Module({})
export class EtcdModule {
    static forRoot(options?: IOptions): DynamicModule {
        return {
            module: EtcdModule,
            providers: [
                EtcdService,
                {
                    provide: ETCD_CLIENT_TOKEN,
                    useFactory(options: IOptions) {
                        const client = new Etcd3(options)

                        return client
                    },
                    inject: [ETCD_CLIENT_OPTIONS_TOKEN]
                },
                {
                    provide: ETCD_CLIENT_OPTIONS_TOKEN,
                    useValue: options
                }
            ],
            exports: [
                EtcdService
            ]
        }
    }

    // 和 forRoot 的区别就是现在的 options 的 provider 是通过 useFactory 的方式创建的，之前是直接传入。
    static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
        return {
            module: EtcdModule,
            providers: [
                EtcdService,
                {
                    provide: ETCD_CLIENT_TOKEN,
                    useFactory(options: IOptions) {
                        const client = new Etcd3(options);
                        return client;
                    },
                    inject: [ETCD_CLIENT_OPTIONS_TOKEN]
                },
                {
                    provide: ETCD_CLIENT_OPTIONS_TOKEN,
                    useFactory: options.useFactory,
                    inject: options.inject || []
                }
            ],
            exports: [
                EtcdService
            ]
        }
    }
}
