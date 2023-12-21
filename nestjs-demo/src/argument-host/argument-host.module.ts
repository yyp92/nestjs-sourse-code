import { Module } from '@nestjs/common';
import { ArgumentHostService } from './argument-host.service';
import { ArgumentHostController } from './argument-host.controller';

@Module({
  controllers: [ArgumentHostController],
  providers: [ArgumentHostService],
})
export class ArgumentHostModule {}
