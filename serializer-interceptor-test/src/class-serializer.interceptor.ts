import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
    StreamableFile
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassTransformOptions } from 'class-transformer';
import { Observable, map } from 'rxjs';
import * as classTransformer from 'class-transformer';
import { CLASS_SERIALIZER_OPTIONS } from './serialize-options.decorator';

function isObject(value) {
    return value !== null && typeof value === 'object'
}

@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
    // 注入 Reflector 包
    @Inject(Reflector) 
    protected readonly reflector: Reflector;

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const contextOptions = this.getContextOptions(context)

        return next
            .handle()
            .pipe(
                // interceptor 里用 map operator 对返回的数据做修改。
                map((res) =>
                    this.serialize(res, contextOptions),
                ),
            );
    }

    // serialize 方法里根据响应是数组还是对象分别做处理，调用 transformToNewPlain 做转换
    serialize(
        response: Record<string, any> | Array<Record<string, any>>,
        options: ClassTransformOptions
    ){
    
        // 这里排除了 response 不是对象的情况和返回的是文件流的情况
        if (!isObject (response) || response instanceof StreamableFile) {
            return response;
        }
    
        return Array.isArray(response)
            ? response.map(item => this.transformToNewPlain(item, options))
            : this.transformToNewPlain(response, options);
    }

    // transformToNewPlain 就是用 class-transformer 包的 instanceToPlain 根据对象的 class 上的装饰器来创建新对象
    transformToNewPlain(
        palin: any,
        options: ClassTransformOptions,
    ) {
        if (!palin) {
            return palin;
        }
    
        return classTransformer.instanceToPlain(palin, options);
    }

    protected getContextOptions(
        context: ExecutionContext,
    ): ClassTransformOptions | undefined {
        // 用它的 getAllAndOverride 方法拿到 class 或者 handler 上的 metadata
        return this.reflector.getAllAndOverride(
            CLASS_SERIALIZER_OPTIONS,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );
    }
}
