import { Test, TestingModule } from '@nestjs/testing';
import { PipeTestController } from './pipe-test.controller';
import { PipeTestService } from './pipe-test.service';

describe('PipeTestController', () => {
  let controller: PipeTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipeTestController],
      providers: [PipeTestService],
    }).compile();

    controller = module.get<PipeTestController>(PipeTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
