import { Controller, Get, Inject } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN, CccModuleOptions, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } from './configurable-module-builder-create.module-definition';

@Controller('configurable-module-builder-create')
export class ConfigurableModuleBuilderCreateController {
    @Inject(MODULE_OPTIONS_TOKEN)
    private options: typeof OPTIONS_TYPE;

    @Get('')
    hello() {
        return this.options
    }
}
