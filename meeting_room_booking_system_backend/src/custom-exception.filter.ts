import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        response.statusCode = exception.getStatus();

        // 解决 message 并不是具体的错误，具体的错误在 response.message 里
        const res = exception.getResponse() as {message: string[]}

        response
            .json({
                code: exception.getStatus(),
                message: 'fail',
                data: res?.message?.join?.(',') || exception.message
            })
            .end();
    }
}
