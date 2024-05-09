import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Inject,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Request} from 'express'
import { Observable } from 'rxjs';
import { RedisService } from './../redis/redis.service';
import { UserService } from './user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
    @Inject(UserService)
    private userService: UserService;

    // 然后在 PermissionGuard 里通过 reflector 取出来
    @Inject(Reflector)
    private reflector: Reflector;

    // 注入 RedisService
    @Inject(RedisService)
    private redisService: RedisService;

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const user = request.session.user;

        if (!user) {
            throw new UnauthorizedException('用户未登录');
        }

        // 查询 redis 中的用户权限
        let permissions = await this.redisService.listGet(`user_${user.username}_permissions`)
        // 如果没有查到就查数据库，并且存到 redis
        if (permissions.length === 0) {
            const foundUser = await this.userService.findByUsername(user.username);
            permissions = foundUser.permissions.map(item => item.name)

            this.redisService.listSet(
                `user_${user.username}_permissions`,
                permissions,

                // 缓存过期时间为 30 分钟
                60 * 30
            )
        }

        const permission = this.reflector.get('permission', context.getHandler());

        // 取出 handler 声明的 metadata，如果用户权限里包含需要的权限，就返回 true，否则抛出没有权限的异常。
        if (permissions.some(item => item === permission)) {
            return true;
        }
        else {
            throw new UnauthorizedException('没有权限访问该接口');
        }
    }
}
