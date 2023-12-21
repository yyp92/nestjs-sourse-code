import { Test, TestingModule } from '@nestjs/testing';
import { NestMulterUploadController } from './nest-multer-upload.controller';
import { NestMulterUploadService } from './nest-multer-upload.service';

describe('NestMulterUploadController', () => {
  let controller: NestMulterUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NestMulterUploadController],
      providers: [NestMulterUploadService],
    }).compile();

    controller = module.get<NestMulterUploadController>(NestMulterUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
