import { forwardRef, Module } from '@nestjs/common';
import { ModuleBbModule } from './module-bb.module';

@Module({
  imports: [forwardRef(() => ModuleBbModule)]
})
export class ModuleAaModule {}
