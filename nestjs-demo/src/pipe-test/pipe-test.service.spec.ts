import { Test, TestingModule } from '@nestjs/testing';
import { PipeTestService } from './pipe-test.service';

describe('PipeTestService', () => {
  let service: PipeTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipeTestService],
    }).compile();

    service = module.get<PipeTestService>(PipeTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
