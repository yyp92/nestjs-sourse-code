/**
 * Module 和 Provider 的循环依赖怎么处理？
 */

import { Module } from '@nestjs/common';
import { ModuleTestService } from './module-test.service';
import { ModuleTestController } from './module-test.controller';
import { ModuleAaModule } from './module/module-aa.module';
import { ModuleBbModule } from './module/module-bb.module';
import { ServiceCcService } from './service/service-cc.service';
import { ServiceDdService } from './service/service-dd.service';

@Module({
  controllers: [ModuleTestController],
  providers: [ModuleTestService, ServiceCcService, ServiceDdService],
  imports: [ModuleAaModule,ModuleBbModule],
})
export class ModuleTestModule {}
