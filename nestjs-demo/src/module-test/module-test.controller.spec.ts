import { Test, TestingModule } from '@nestjs/testing';
import { ModuleTestController } from './module-test.controller';
import { ModuleTestService } from './module-test.service';

describe('ModuleTestController', () => {
  let controller: ModuleTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleTestController],
      providers: [ModuleTestService],
    }).compile();

    controller = module.get<ModuleTestController>(ModuleTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
