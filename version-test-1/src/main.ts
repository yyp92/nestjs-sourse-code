import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 自定义
    const extractor = (request: Request) => {
        if (request.headers['disable-custom']) {
            return ''
        }

        return request.url.includes('guang') ? '2' : '1'
    }

    app.enableVersioning({
        // * 用自定义 header 携带版本号
        // type: VersioningType.HEADER,
        // header: 'version'


        // * MEDIA_TYPE 是在 accept 的 header 里携带版本号
        // type: VersioningType.MEDIA_TYPE,
        // key: 'vv='
        

        // * 也可以用 URI 的方式
        // type: VersioningType.URI


        // * 自定义
        type: VersioningType.CUSTOM,
        extractor
    })

    await app.listen(3000);
}

bootstrap();
