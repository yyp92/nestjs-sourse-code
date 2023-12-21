import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
export class ProvidersController {
    // constructor(
    //     private readonly providersService: ProvidersService,
    //     @Inject('providers1') private readonly providersService1: ProvidersService,
    //     @Inject('providers2') private readonly providersService2: {name: string, age: number},
    //     @Inject('providers3') private readonly providersService3: {name: string, desc: string},
    //     @Inject('providers4') private readonly providersService4: {name: string, desc: string},
    //     @Inject('providers5') private readonly providersService5: {name: string, desc: string},
    //     @Inject('providers6') private readonly providersService6: {name: string, desc: string}
    // ){}

    @Inject(ProvidersService)
    private readonly providersService: ProvidersService;
    @Inject('providers1')
    private readonly providersService1: ProvidersService;
    @Inject('providers2')
    private readonly providersService2: {name: string, age: number};
    @Inject('providers3')
    private readonly providersService3: {name: string, desc: string};
    @Inject('providers4')
    private readonly providersService4: {name: string, desc: string};
    @Inject('providers5')
    private readonly providersService5: {name: string, desc: string};
    @Inject('providers6')
    private readonly providersService6: {name: string, desc: string};


    @Get()
    create(): string {
        console.log('providersService1', this.providersService1)
        console.log('providersService2', this.providersService2)
        console.log('providersService3', this.providersService3)
        console.log('providersService4', this.providersService4)
        console.log('providersService5', this.providersService5)
        console.log('providersService6', this.providersService6)

        return this.providersService.create('providersService')
    }
}
