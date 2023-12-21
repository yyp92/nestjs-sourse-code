import { Test, TestingModule } from '@nestjs/testing';
import { FastifyTestService } from './fastify-test.service';

describe('FastifyTestService', () => {
  let service: FastifyTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FastifyTestService],
    }).compile();

    service = module.get<FastifyTestService>(FastifyTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
