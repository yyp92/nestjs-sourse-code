import { Test, TestingModule } from '@nestjs/testing';
import { HostParamService } from './host-param.service';

describe('HostParamService', () => {
  let service: HostParamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostParamService],
    }).compile();

    service = module.get<HostParamService>(HostParamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
