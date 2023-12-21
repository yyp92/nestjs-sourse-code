import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus, HttpException, ParseFloatPipe, ParseBoolPipe, ParseArrayPipe, ParseEnumPipe, ParseUUIDPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { PipeTestService } from './pipe-test.service';
import { CreatePipeTestDto } from './dto/create-pipe-test.dto';
import { UpdatePipeTestDto } from './dto/update-pipe-test.dto';
import { AaPipe } from './pipe/aa.pipe';
import { Oo } from './dto/oo.dto';
import { MyValidationPipe } from './pipe/my-validation.pipe';
import { Pp } from './dto/pp.dto';

enum Ggg {
    AAA = '111',
    BBB = '222',
    CCC = '333'
}

@Controller('pipe-test')
export class PipeTestController {
    constructor(private readonly pipeTestService: PipeTestService) {}

    @Get()
    getHello(@Query('aa', ParseIntPipe) aa: string): string {
        return aa + 1
    }

    @Get('aa')
    aa(@Query('aa', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND
    })) aa: string): string {
        return aa + 1
    }

    @Get('bb')
    bb(@Query('aa', new ParseIntPipe({
        exceptionFactory: (msg) => {
            console.log('exceptionFactory', msg)
            throw new HttpException('xxx' + msg, HttpStatus.NOT_IMPLEMENTED)
        }
    })) aa: string): string {
        return aa + 1
    }

    @Get('cc')
    cc(@Query('cc', ParseFloatPipe) cc: number): number {
        return cc + 1
    }

    @Get('dd')
    dd(@Query('dd', ParseBoolPipe) dd: boolean) {
        return typeof dd
    }

    @Get('ee')
    ee(@Query('ee', ParseArrayPipe) ee: Array<number>) {
        return ee.reduce((total, item) => total + item, 0)
    }

    @Get('ff')
    ff(@Query('ff', new ParseArrayPipe({
        separator: '..',
        optional: true
    })) ff: Array<string>) {
        return ff
    }

    @Get('gg/:enum')
    gg(@Param('enum', new ParseEnumPipe(Ggg)) e: Ggg) {
        return e
    }

    // uuid -> 862c7f46-5190-4c7b-8441-d4b566bab16f
    @Get('hh/:uuid')
    hh(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return uuid
    }

    @Get('kk')
    kk(@Query('kk', new DefaultValuePipe('aa')) kk: string) {
        return kk
    }

    @Get('nn/:bb')
    nn(
        @Query('aa', AaPipe) aa: string,
        @Param('bb', AaPipe) bb: number
    ) {
        return aa + bb
    }

    // @Post('oo')
    // oo(@Body() obj: Oo) {
    //     console.log('--oo', obj)
    // }

    // @Post('oo')
    // oo(@Body(new ValidationPipe()) obj: Oo) {
    //     console.log('--oo', obj)
    // }

    // @Post('oo')
    // oo(@Body(new MyValidationPipe()) obj: Oo) {
    //     console.log('--oo', obj)
    // }

    @Post('oo')
    oo(@Body(MyValidationPipe) obj: Oo) {
        console.log('--oo', obj)
    }

    @Post('pp')
    pp(@Body(MyValidationPipe) post: Pp) {
        console.log('--pp', post)
    }
}
