/**
 * 如何创建动态模块
 */


import { Module } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';
import { DynamicModuleController } from './dynamic-module.controller';
import { BbModule } from './bb/bb.module';
import { ConfigurableModuleBuilderCreateModule } from './configurable-module-builder-create/configurable-module-builder-create.module';

@Module({
    controllers: [DynamicModuleController],
    providers: [DynamicModuleService],
    imports: [
        BbModule.register({
            aa: 1,
            bb: 2
        }),

        ConfigurableModuleBuilderCreateModule.register({
            cc: 3,
            dd: 4,
            isGlobal: true
        }),

        ConfigurableModuleBuilderCreateModule.registerAsync({
            useFactory: async () => {
                await 111;

                return {
                    cc: 333,
                    dd: 444,
                    isGlobal: true
                }
            },
            inject: []
        })
    ],
})
export class DynamicModuleModule {}
