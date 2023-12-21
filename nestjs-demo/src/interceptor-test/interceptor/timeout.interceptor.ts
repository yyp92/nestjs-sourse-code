import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { Observable, timeout, catchError, TimeoutError, throwError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                timeout(3000),
                catchError((err: any) => {
                    if (err instanceof TimeoutError) {
                        console.log('--err', err)
                        // return throwError(() => new RequestTimeoutException())

                        return throwError(() => new HttpException('TimeoutError', HttpStatus.FOUND))
                    }

                    return throwError(() => err)
                })
            )
    }
}
