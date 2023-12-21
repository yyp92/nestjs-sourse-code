import { Test, TestingModule } from '@nestjs/testing';
import { ModuleTestService } from './module-test.service';

describe('ModuleTestService', () => {
  let service: ModuleTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleTestService],
    }).compile();

    service = module.get<ModuleTestService>(ModuleTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
