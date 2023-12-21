import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './configurable-module-builder-create.module-definition';
import { ConfigurableModuleBuilderCreateController } from './configurable-module-builder-create.controller';

@Module({
  controllers: [ConfigurableModuleBuilderCreateController]
})
export class ConfigurableModuleBuilderCreateModule extends ConfigurableModuleClass {}
