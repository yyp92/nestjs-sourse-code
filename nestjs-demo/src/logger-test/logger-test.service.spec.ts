import { Test, TestingModule } from '@nestjs/testing';
import { LoggerTestService } from './logger-test.service';

describe('LoggerTestService', () => {
  let service: LoggerTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerTestService],
    }).compile();

    service = module.get<LoggerTestService>(LoggerTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
