/**
 * * 权限鉴权
 */
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PermissionGuard implements CanActivate {
    @Inject(Reflector)
    private reflector: Reflector;

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        if (!request.user) {
            return true;
        }

        const permissions = request.user.permissions;

        // 同样是用 reflector 取出 handler 或者 controller 上的 require-permission 的 metadata
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
            'require-permission',
            [
                context.getClass(),
                context.getHandler()
            ]
        )
        
        // 如果没有，就是不需要权限，直接放行，返回 true
        if (!requiredPermissions) {
            return true;
        }
        
        // 对于需要的每个权限，检查下用户是否拥有，没有的话就返回 401，提示没权限
        for (let i = 0; i < requiredPermissions.length; i++) {
            const curPermission = requiredPermissions[i];
            const found = permissions.find(item => item.code === curPermission);

            if (!found) {
                throw new UnauthorizedException('您没有访问该接口的权限');
            }
        }

        // 否则就放行，返回 true
        return true;
    }
}
