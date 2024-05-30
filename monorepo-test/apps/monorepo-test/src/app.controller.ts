import { Lib1Service } from '@app/lib1';
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    // @Get('aaa')
    // aaa() {
    //     return 'aaa';
    // }  
    
    @Inject(Lib1Service)
    private lib : Lib1Service;

    @Get('aaa')
    aaa() {
        return 'aaa' + this.lib.xxx();
    }
}
