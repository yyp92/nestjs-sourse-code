import { Inject, Controller, Get, Query } from '@nestjs/common';
import { Etcd3 } from 'etcd3';
import { AppService } from './app.service';

@Controller()
export class AppController {
    @Inject('ETCD_CLIENT')
    private etcdClient: Etcd3;

    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Get('put')
    async put(@Query('value') value: string) {
        await this.etcdClient.put('aaa').value(value)

        return 'done'
    }

    @Get('get')
    async get() {
        return await this.etcdClient.get('aaa').string()
    }

    @Get('del')
    async del() {
        await this.etcdClient.delete().key('aaa')

        return 'done'
    }
}
