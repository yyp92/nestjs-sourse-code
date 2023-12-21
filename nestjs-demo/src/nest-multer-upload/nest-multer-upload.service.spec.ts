import { Test, TestingModule } from '@nestjs/testing';
import { NestMulterUploadService } from './nest-multer-upload.service';

describe('NestMulterUploadService', () => {
  let service: NestMulterUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestMulterUploadService],
    }).compile();

    service = module.get<NestMulterUploadService>(NestMulterUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
