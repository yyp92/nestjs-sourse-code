import { Test, TestingModule } from '@nestjs/testing';
import { InterceptorTestController } from './interceptor-test.controller';
import { InterceptorTestService } from './interceptor-test.service';

describe('InterceptorTestController', () => {
  let controller: InterceptorTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterceptorTestController],
      providers: [InterceptorTestService],
    }).compile();

    controller = module.get<InterceptorTestController>(InterceptorTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
