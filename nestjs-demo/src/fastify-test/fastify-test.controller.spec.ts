import { Test, TestingModule } from '@nestjs/testing';
import { FastifyTestController } from './fastify-test.controller';
import { FastifyTestService } from './fastify-test.service';

describe('FastifyTestController', () => {
  let controller: FastifyTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FastifyTestController],
      providers: [FastifyTestService],
    }).compile();

    controller = module.get<FastifyTestController>(FastifyTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
