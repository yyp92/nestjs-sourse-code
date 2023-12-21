import { Test, TestingModule } from '@nestjs/testing';
import { MiddlewareTestController } from './middleware-test.controller';
import { MiddlewareTestService } from './middleware-test.service';

describe('MiddlewareTestController', () => {
  let controller: MiddlewareTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiddlewareTestController],
      providers: [MiddlewareTestService],
    }).compile();

    controller = module.get<MiddlewareTestController>(MiddlewareTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
