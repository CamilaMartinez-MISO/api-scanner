import { Test, TestingModule } from '@nestjs/testing';
import { RamaService } from './rama.service';

describe('RamaService', () => {
  let service: RamaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamaService],
    }).compile();

    service = module.get<RamaService>(RamaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
