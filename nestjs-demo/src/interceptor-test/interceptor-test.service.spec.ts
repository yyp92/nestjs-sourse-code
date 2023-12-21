import { Test, TestingModule } from '@nestjs/testing';
import { InterceptorTestService } from './interceptor-test.service';

describe('InterceptorTestService', () => {
  let service: InterceptorTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterceptorTestService],
    }).compile();

    service = module.get<InterceptorTestService>(InterceptorTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
