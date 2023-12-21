import { Test, TestingModule } from '@nestjs/testing';
import { MetadataAndReflectorService } from './metadata-and-reflector.service';

describe('MetadataAndReflectorService', () => {
  let service: MetadataAndReflectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadataAndReflectorService],
    }).compile();

    service = module.get<MetadataAndReflectorService>(MetadataAndReflectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
