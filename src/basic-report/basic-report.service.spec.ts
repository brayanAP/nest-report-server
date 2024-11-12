import { Test, TestingModule } from '@nestjs/testing';
import { BasicReportService } from './basic-report.service';

describe('BasicReportService', () => {
  let service: BasicReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicReportService],
    }).compile();

    service = module.get<BasicReportService>(BasicReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
