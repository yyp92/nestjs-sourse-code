import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException
} from '@nestjs/common';
Inject
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';
import { Permission } from './user/entities/permission.entity';
import { RedisService } from './redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
    @Inject(UserService) 
    private userService: UserService;

    @Inject(Reflector)
    private reflector: Reflector;

     // 注入 RedisService
     @Inject(RedisService)
     private redisService: RedisService;

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        /**
         * 因为这个 PermissionGuard 在 LoginGuard 之后调用（在 AppModule 里声明在 LoginGuard 之后），所以走到这里 request 里就有 user 对象了。
         * 但也不一定，因为 LoginGuard 没有登录也可能放行，所以要判断下 request.user 如果没有，这里也放行。
         */
        if (!request.user) {
            return true;
        }

        // 查询 redis 中的用户权限
        let permissions: string[] = await this.redisService.listGet(`user_role_${request.user.username}_permissions`)
        // 如果没有查到就查数据库，并且存到 redis
        if (permissions.length === 0) {
            // 然后取出 user 的 roles 的 id，查出 roles 的 permission 信息，然后合并到一个数组里
            const roles = await this.userService.findRolesByIds(request.user.roles.map(item => item.id))
            console.log(roles);

            permissions = roles
                .reduce((total, current) => {
                    total.push(...current.permissions);
        
                    return total;
                }, [])
                .map((item: any) => item.name)
    

            this.redisService.listSet(
                `user_role_${request.user.username}_permissions`,
                permissions,

                // 缓存过期时间为 30 分钟
                60 * 30
            )
        }

        console.log(permissions);



        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
            'require-permission',
            [
                context.getClass(),
                context.getHandler()
            ]
        )
          
        console.log(requiredPermissions);

        // 添加这样的对比逻辑
        for (let i = 0; i < requiredPermissions.length; i++) {
            const curPermission = requiredPermissions[i];
            const found = permissions.find(item => item === curPermission);

            if (!found) {
                throw new UnauthorizedException('您没有访问该接口的权限');
            }
        }       

        return true;
    }
}
