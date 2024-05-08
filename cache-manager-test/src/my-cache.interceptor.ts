import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RedisClientType } from 'redis';
import { of, tap } from 'rxjs';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
    // redisClient 是我们前面创建的 provider，注入到这里来操作 redis。
    @Inject('REDIS_CLIENT')
    private redisClient: RedisClientType;

    /**
     * HttpAdapterHost 前面没用过。我们知道 Nest 底层可以切换 express、fastify 等库，而这些库都会实现一个通用的适配器，就是 HttpAdapter。
     * 我们这里用到这个适配器的方法来拿到 requestUrl，也就是 /aaa?a=3 这种
     */
    @Inject(HttpAdapterHost)
    private httpAdapterHost: HttpAdapterHost;

    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
    
        const key = this.httpAdapterHost.httpAdapter.getRequestUrl(request);
    
        const value = await this.redisClient.get(key);
    
        if (!value) {
            // 执行 handler 并且设置到 redis 里
            return next.handle().pipe(tap((res) => {
                this.redisClient.set(key, res);
            }))
        }
        // 如果查到了 key，就直接返回 value
        else {
            return of(value);
        }    
    }
}
