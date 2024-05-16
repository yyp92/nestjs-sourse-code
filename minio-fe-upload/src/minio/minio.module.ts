import { Global, Module } from '@nestjs/common';
import * as Minio from 'minio';

export const MINIO_CLIENT = 'MINIO_CLIENT';

// 把 minio client 封装成 provider，放到 exports 里，并设置模块为 @Global
@Global()
@Module({
    providers: [
        {
            provide: MINIO_CLIENT,
            async useFactory() {
                const client = new Minio.Client({
                    endPoint: 'localhost',
                    port: 9000,
                    useSSL: false,
                    accessKey: '',
                    secretKey: ''
                })

                return client;
            }
          }
    ],
    exports: [MINIO_CLIENT]
})
export class MinioModule {}
