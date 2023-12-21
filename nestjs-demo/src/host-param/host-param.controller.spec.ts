import { Test, TestingModule } from '@nestjs/testing';
import { HostParamController } from './host-param.controller';
import { HostParamService } from './host-param.service';

describe('HostParamController', () => {
  let controller: HostParamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostParamController],
      providers: [HostParamService],
    }).compile();

    controller = module.get<HostParamController>(HostParamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
