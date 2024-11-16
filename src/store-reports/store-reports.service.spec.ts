import { Test, TestingModule } from '@nestjs/testing';
import { StoreReportsService } from './store-reports.service';

describe('StoreReportsService', () => {
  let service: StoreReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreReportsService],
    }).compile();

    service = module.get<StoreReportsService>(StoreReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
