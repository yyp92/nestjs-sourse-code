import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import {CACHE_MANAGER, CacheInterceptor} from '@nestjs/cache-manager'
import {Cache} from 'cache-manager'
import {MyCacheInterceptor} from './my-cache.interceptor'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache;

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('set')
    async set(@Query('value') value: string) {
        await this.cacheManager.set('kkk', value)

        return 'done'
    }

    @Get('get')
    async get() {
        return await this.cacheManager.get('kkk')
    }

    @Get('del')
    async del() {
        await this.cacheManager.del('kkk')

        return 'done'
    }

    // @Get('aaa')
    // @UseInterceptors(CacheInterceptor)
    // aaa(@Query('a') a: string){
    //     console.log('aaa', a);
    //     return 'aaa';
    // }

    @Get('aaa')
    @UseInterceptors(MyCacheInterceptor)
    aaa(@Query('a') a: string){
        console.log('aaa', a);
        return 'aaa';
    }
}
