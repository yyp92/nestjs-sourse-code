/**
 * * 对 AuthGuard('jwt') 做下扩展
 */
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "src/is-public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    // 实现就是从目标 controller、handler 上取 public 的 meatadata，如果有就直接放行，否则才做认证。
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}