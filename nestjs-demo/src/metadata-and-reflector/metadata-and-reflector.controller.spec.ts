import { Test, TestingModule } from '@nestjs/testing';
import { MetadataAndReflectorController } from './metadata-and-reflector.controller';
import { MetadataAndReflectorService } from './metadata-and-reflector.service';

describe('MetadataAndReflectorController', () => {
  let controller: MetadataAndReflectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetadataAndReflectorController],
      providers: [MetadataAndReflectorService],
    }).compile();

    controller = module.get<MetadataAndReflectorController>(MetadataAndReflectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
