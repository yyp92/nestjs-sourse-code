import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentHostController } from './argument-host.controller';
import { ArgumentHostService } from './argument-host.service';

describe('ArgumentHostController', () => {
  let controller: ArgumentHostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArgumentHostController],
      providers: [ArgumentHostService],
    }).compile();

    controller = module.get<ArgumentHostController>(ArgumentHostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
