import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ProvidersModule } from './providers/providers.module';
import { AllDecoratorModule } from './all-decorator/all-decorator.module';
import { ArgumentHostModule } from './argument-host/argument-host.module';
import { HostParamModule } from './host-param/host-param.module';
import { CustomDecoratorModule } from './custom-decorator/custom-decorator.module';
import { MetadataAndReflectorModule } from './metadata-and-reflector/metadata-and-reflector.module';
import { ModuleTestModule } from './module-test/module-test.module';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';
import { FastifyTestModule } from './fastify-test/fastify-test.module';
import { MiddlewareTestModule } from './middleware-test/middleware-test.module';
import { InterceptorTestModule } from './interceptor-test/interceptor-test.module';
import { PipeTestModule } from './pipe-test/pipe-test.module';
import { NestMulterUploadModule } from './nest-multer-upload/nest-multer-upload.module';
import { LoggerTestModule } from './logger-test/logger-test.module';


// @Module 声明模块
@Module({
    // 当 import 别的模块后，那个模块 exports 的 provider 就可以在当前模块注入了。
    imports: [
        // PersonModule,
        // ProvidersModule,
        // AllDecoratorModule,
        // ArgumentHostModule,
        // HostParamModule,
        // CustomDecoratorModule,
        // MetadataAndReflectorModule,
        // ModuleTestModule,
        // DynamicModuleModule,
        // MiddlewareTestModule,
        // InterceptorTestModule,
        // PipeTestModule,
        NestMulterUploadModule,
        LoggerTestModule,

        // todo Fastify 请求库
        // FastifyTestModule
    ],

    // controllers 是控制器，只能被注入
    controllers: [AppController],

    // providers 里可以被注入，也可以注入别的对象，比如这里的 AppService
    providers: [AppService],
})
export class AppModule {}
