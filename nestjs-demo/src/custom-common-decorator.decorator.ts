import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { CustomDecorator } from './custom-decorator.decorator';
import { CustomGuardGuard } from './custom-guard.guard';

export function CustomCommonDecorator(path, role) {
    return applyDecorators(
        Get(path),
        CustomDecorator(role),
        UseGuards(CustomGuardGuard)
    )
}
