import { Controller, Get, Post, Body, Patch, Param, Delete, Next, Response } from '@nestjs/common';
import { MiddlewareTestService } from './middleware-test.service';
import { CreateMiddlewareTestDto } from './dto/create-middleware-test.dto';
import { UpdateMiddlewareTestDto } from './dto/update-middleware-test.dto';

@Controller('middleware-test')
export class MiddlewareTestController {
    constructor(private readonly middlewareTestService: MiddlewareTestService) {}

    @Get()
    getHello(): string {
        console.log('hello')

        return this.middlewareTestService.getHello()
    }

    @Get('hello')
    getHello1(): string {
        console.log('hello')

        return this.middlewareTestService.getHello()
    }

    @Get('hello2')
    getHello2(): string {
        console.log('hello2')

        return this.middlewareTestService.getHello()
    }

    @Get('world1')
    getWorld1(): string {
        console.log('world1')

        return this.middlewareTestService.getHello()
    }

    @Get('world2')
    getWorld2(): string {
        console.log('world2')

        return this.middlewareTestService.getHello()
    }

    @Get('aa')
    a1(@Next() next, @Response({passthrough: true}) response) {
        return 'hello-aa'
    }

    @Get('bb')
    b1(@Next() next) {
        next()

        return 'hello-bb1'
    }

    @Get('bb')
    b2() {
        return 'hello-bb2'
    }
}
