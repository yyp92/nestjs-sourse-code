import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { InterceptorTestService } from './interceptor-test.service';
import { CreateInterceptorTestDto } from './dto/create-interceptor-test.dto';
import { UpdateInterceptorTestDto } from './dto/update-interceptor-test.dto';
import { AaInterceptor } from './interceptor/aa.interceptor';
import { MapTestInterceptor } from './interceptor/map-test.interceptor';
import { TapTestInterceptor } from './interceptor/tap-test.interceptor';
import { CatchErrorTestInterceptor } from './interceptor/catch-error-test.interceptor';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';
import { resolve } from 'path';

@Controller('interceptor-test')
export class InterceptorTestController {
    constructor(private readonly interceptorTestService: InterceptorTestService) {}

    @Get()
    @UseInterceptors(AaInterceptor)
    getHello(): string {
        return this.interceptorTestService.getHello()
    }

    @Get('aa')
    @UseInterceptors(MapTestInterceptor)
    aa() {
        return 'MapTestInterceptor'
    }

    @Get('bb')
    @UseInterceptors(TapTestInterceptor)
    bb() {
        return 'TapTestInterceptor'
    }

    @Get('cc')
    @UseInterceptors(CatchErrorTestInterceptor)
    cc() {
        throw new Error('CatchErrorTestInterceptor-xxxx')
        return 'CatchErrorTestInterceptor'
    }

    @Get('dd')
    @UseInterceptors(TimeoutInterceptor)
    async dd() {
        await new Promise(resolve => setTimeout(resolve, 4000))

        return 'TimeoutInterceptor'
    }

    @Get('ee')
    ee() {
        return 'ee'
    }
}
