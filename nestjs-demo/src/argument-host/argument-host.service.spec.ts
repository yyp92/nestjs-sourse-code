import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentHostService } from './argument-host.service';

describe('ArgumentHostService', () => {
  let service: ArgumentHostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArgumentHostService],
    }).compile();

    service = module.get<ArgumentHostService>(ArgumentHostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
