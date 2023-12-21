import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { InterceptorTestService } from '../interceptor-test.service';

@Injectable()
export class AaInterceptor implements NestInterceptor {
    constructor(private interceptorTestService: InterceptorTestService) {}


    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('ee---', this.interceptorTestService.getHello())

        const now = Date.now()

        return next
            .handle()
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`))
            )
    }
}
