import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, Headers, Query, ParseIntPipe } from '@nestjs/common';
import { CustomDecoratorService } from './custom-decorator.service';
import { CreateCustomDecoratorDto } from './dto/create-custom-decorator.dto';
import { UpdateCustomDecoratorDto } from './dto/update-custom-decorator.dto';
import {CustomGuardGuard} from '../custom-guard.guard'
import { Ccc, MyHeaders, MyQuery, CustomDecorator, Ddd, Ddd1 } from '../custom-decorator.decorator';
import { CustomCommonDecorator } from '../custom-common-decorator.decorator';


// @Controller('custom-decorator')
// @Ddd()
@Ddd1('eee', 'guang1')
export class CustomDecoratorController {
    constructor(private readonly customDecoratorService: CustomDecoratorService) {}

    @Get()
    @SetMetadata('aaa', 'admin')
    @UseGuards(CustomGuardGuard)
    getText(): string {
        return this.customDecoratorService.getText()
    }


    @Get('hello')
    @CustomDecorator('admin')
    @UseGuards(CustomGuardGuard)
    getText1(): string {
        return this.customDecoratorService.getText()
    }


    @CustomCommonDecorator('hello2', 'admin')
    getText2(): string {
        return this.customDecoratorService.getText()
    }


    @Get('hello4')
    getHello4(@Ccc() c) {
        return c
    }

    @Get('hello5')
    getHello5(@Headers('Accept') headers1, @MyHeaders('Accept') headers2) {
        console.log('headers1', headers1)
        console.log('headers2', headers2)
    }

    @Get('hello6')
    getHello6(@Query('aaa') aaa, @MyQuery('bbb') bbb) {
        console.log('aaa', aaa)
        console.log('bbb', bbb)
    }

    @Get('hello7')
    getHello7(@Query('aaa', new ParseIntPipe()) aaa, @MyQuery('bbb', new ParseIntPipe()) bbb) {
        console.log('aaa', aaa + 1)
        console.log('bbb', bbb + 1)
    }
}
