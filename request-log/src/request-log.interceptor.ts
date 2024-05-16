import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    NestInterceptor
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import * as requestIp from 'request-ip';
import { HttpService } from '@nestjs/axios';
import * as iconv from 'iconv-lite'

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
    private readonly logger = new Logger(RequestLogInterceptor.name);

    @Inject(HttpService)
    private httpService: HttpService;

    async ipToCity(ip: string) {
        // 如果想用原生 axios 对象，可以直接调用 this.httpService.axiosRef.xxx，这样返回的就是 promise
        const response = await this.httpService.axiosRef(
            `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
            {
                // 指定 responseType 为 arraybuffer，也就是二进制的数组
                responseType: 'arraybuffer',
                transformResponse: [
                    function(data) {
                        // 然后用 gbk 的字符集来解码
                        const str = iconv.decode(data, 'gbk')

                        return JSON.parse(str)
                    }
                ]
            }
        );

        return response.data.addr;
    }

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ) {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        console.log(await this.ipToCity('221.237.121.165'))

        const userAgent = request.headers['user-agent'];

        const {
            ip,
            method,
            path
        } = request;

        const clientIp = requestIp.getClientIp(ip) || ip;

        this.logger.debug(
            `${method} ${path} ${clientIp} ${userAgent}: ${
                context.getClass().name
            } ${
                context.getHandler().name
            } invoked...`,
        );

        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap((res) => {
                    this.logger.debug(
                        `${method} ${path} ${clientIp} ${userAgent}: ${response.statusCode}: ${Date.now() - now}ms`,
                    );

                    this.logger.debug(`Response: ${JSON.stringify(res)}`);
                }),
            );
    }
}
