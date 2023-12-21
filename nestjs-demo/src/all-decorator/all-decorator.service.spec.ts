import { Test, TestingModule } from '@nestjs/testing';
import { AllDecoratorService } from './all-decorator.service';

describe('AllDecoratorService', () => {
  let service: AllDecoratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllDecoratorService],
    }).compile();

    service = module.get<AllDecoratorService>(AllDecoratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
