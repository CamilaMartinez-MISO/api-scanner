import { Test, TestingModule } from '@nestjs/testing';
import { GithubScannerService } from './github-scanner.service';

describe('GithubScannerService', () => {
  let service: GithubScannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubScannerService],
    }).compile();

    service = module.get<GithubScannerService>(GithubScannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
