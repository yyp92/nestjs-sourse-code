import { forwardRef, Module } from '@nestjs/common';
import { ModuleAaModule } from './module-aa.module';

@Module({
    imports: [forwardRef(() => ModuleAaModule)]
})
export class ModuleBbModule {}
