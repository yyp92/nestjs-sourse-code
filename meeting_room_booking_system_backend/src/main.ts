import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './custom-exception.filter';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { UnloginFilter } from './unlogin.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // 添加 uploads 目录为静态目录
    app.useStaticAssets('uploads', {
        prefix: '/uploads'
    })

    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalInterceptors(new FormatResponseInterceptor())
    app.useGlobalInterceptors(new InvokeRecordInterceptor)
    // app.useGlobalFilters(new UnloginFilter())
    app.useGlobalFilters(new CustomExceptionFilter())

    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle('会议室预订系统')
        .setDescription('api 接口文档')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            description: '基于 jwt 的认证'
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);
    
    const configService = app.get(ConfigService);
    await app.listen(configService.get('nest_server_port'));
}
bootstrap();
