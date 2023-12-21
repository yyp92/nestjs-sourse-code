/**
 * nest 装饰器学习
 */

import { Module } from '@nestjs/common';
import { HostParamService } from './host-param.service';
import { HostParamController } from './host-param.controller';

@Module({
  controllers: [HostParamController],
  providers: [HostParamService],
})
export class HostParamModule {}
