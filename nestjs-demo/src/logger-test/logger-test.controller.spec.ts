import { Test, TestingModule } from '@nestjs/testing';
import { LoggerTestController } from './logger-test.controller';
import { LoggerTestService } from './logger-test.service';

describe('LoggerTestController', () => {
  let controller: LoggerTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggerTestController],
      providers: [LoggerTestService],
    }).compile();

    controller = module.get<LoggerTestController>(LoggerTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
