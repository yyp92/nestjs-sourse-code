import { Test, TestingModule } from '@nestjs/testing';
import { MiddlewareTestService } from './middleware-test.service';

describe('MiddlewareTestService', () => {
  let service: MiddlewareTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiddlewareTestService],
    }).compile();

    service = module.get<MiddlewareTestService>(MiddlewareTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
