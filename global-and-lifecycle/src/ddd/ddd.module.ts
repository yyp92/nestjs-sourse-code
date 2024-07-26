import { BeforeApplicationShutdown, Module, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';

@Module({
    controllers: [DddController],
    providers: [DddService],
})
export class DddModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    onModuleInit() {
        console.log('DddModule OnModuleInit')
    }

    onApplicationBootstrap() {
        console.log('DddModule OnApplicationBootstrap')
    }

    onModuleDestroy() {
        console.log('DddModule onModuleDestroy')
    }

    beforeApplicationShutdown(signal: string) {
        console.log('DddModule beforeApplicationShutdown', signal)
    }

    onApplicationShutdown() {
        console.log('DddModule onApplicationShutdown')
    }
}
