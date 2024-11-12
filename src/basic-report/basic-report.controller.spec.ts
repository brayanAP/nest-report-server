import { Test, TestingModule } from '@nestjs/testing';
import { BasicReportController } from './basic-report.controller';
import { BasicReportService } from './basic-report.service';

describe('BasicReportController', () => {
  let controller: BasicReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicReportController],
      providers: [BasicReportService],
    }).compile();

    controller = module.get<BasicReportController>(BasicReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
