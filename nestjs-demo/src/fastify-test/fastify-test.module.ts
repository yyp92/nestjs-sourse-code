/**
 * Nest 和 Express 的关系，如何切到 fastify
 */


import { Module } from '@nestjs/common';
import { FastifyTestService } from './fastify-test.service';
import { FastifyTestController } from './fastify-test.controller';

@Module({
  controllers: [FastifyTestController],
  providers: [FastifyTestService],
})
export class FastifyTestModule {}
