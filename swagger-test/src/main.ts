import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 通过 DocumentBuilder 创建 config
    const config = new DocumentBuilder()
        .setTitle('Test example')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('test')
        .addBasicAuth({
            type: 'http',
            name: 'basic',
            description: '用户名 + 密码'
        })
        .addCookieAuth('sid', {
            type: 'apiKey',
            name: 'cookie',
            description: '基于 cookie 的认证'
        })
        .addBearerAuth({
            type: 'http',
            description: '基于 jwt 的认证',
            name: 'bearer'
        })
        .build();
    // 用 SwaggerModule.createDocument 根据 config 创建文档。
    const document = SwaggerModule.createDocument(app, config);
    // 用 SwaggerModule.setup 指定在哪个路径可以访问文档
    SwaggerModule.setup('doc', app, document);

    await app.listen(3000);
}
bootstrap();
