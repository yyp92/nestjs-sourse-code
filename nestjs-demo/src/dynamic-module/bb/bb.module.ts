import { Module, DynamicModule } from '@nestjs/common';
import { BbService } from './bb.service';
import { BbController } from './bb.controller';

@Module({})
export class BbModule {
    static register(options: Record<string, any>): DynamicModule {
        return {
            module: BbModule,
            controllers: [BbController],
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options
                },
                BbService
            ],
            exports: []
        }
    }
}



// @Module({
//     controllers: [BbController],
//     providers: [BbService]
// })
// export class BbModule {}
