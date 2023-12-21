import { SetMetadata, createParamDecorator, ExecutionContext, Controller, applyDecorators } from '@nestjs/common';
import {Request} from 'express'

export const CustomDecorator = (...args: string[]) => SetMetadata('custom-decorator', args);


export const Ccc = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      return 'ccc';
    },
);


export const MyHeaders = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        return key ? request.headers[key?.toLocaleLowerCase()] : request.headers;
    },
);


export const MyQuery = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        return request.query[key];
    },
);


export const Ddd = () => Controller('ddd')

export const Ddd1 = (path, metadata) => {
    return applyDecorators(
        Controller(path),
        SetMetadata('ddd', metadata)
    )
}
