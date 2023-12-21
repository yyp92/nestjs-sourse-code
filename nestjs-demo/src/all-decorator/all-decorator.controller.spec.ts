import { Test, TestingModule } from '@nestjs/testing';
import { AllDecoratorController } from './all-decorator.controller';
import { AllDecoratorService } from './all-decorator.service';

describe('AllDecoratorController', () => {
  let controller: AllDecoratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllDecoratorController],
      providers: [AllDecoratorService],
    }).compile();

    controller = module.get<AllDecoratorController>(AllDecoratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
