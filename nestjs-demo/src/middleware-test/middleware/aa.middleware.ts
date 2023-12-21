import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import {Request, Response} from 'express'
import { MiddlewareTestService } from '../middleware-test.service';

@Injectable()
export class AaMiddleware implements NestMiddleware {
    // @Inject(MiddlewareTestService)
    // private readonly middlewareTestService: MiddlewareTestService;

    constructor(private readonly middlewareTestService: MiddlewareTestService) {}


    use(req: Request, res: Response, next: () => void) {
        console.log('brefore');
        console.log('----middlewareTestService', this.middlewareTestService.getHello())

        next();

        console.log('after');
    }
}
