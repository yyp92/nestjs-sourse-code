import { applyDecorators } from '@nestjs/common';
import { Validate, ValidationOptions } from 'class-validator';
import { MyValidator } from './my-validator';

export function MyContains(content: string, options?: ValidationOptions) {
    // 用 applyDecorators 组合装饰器生成新的装饰器
    return applyDecorators(
        Validate(MyValidator, [content], options)
    )
}
