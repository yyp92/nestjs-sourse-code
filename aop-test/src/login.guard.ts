/**
 * * 路由守卫
 */
import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class LoginGuard implements CanActivate {
    @Inject(AppService)
    private appService: AppService;


    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('login check', this.appService.getHello())

        return false;
    }
}
