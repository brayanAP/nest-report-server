import { Test, TestingModule } from '@nestjs/testing';
import { StoreReportsController } from './store-reports.controller';
import { StoreReportsService } from './store-reports.service';

describe('StoreReportsController', () => {
  let controller: StoreReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreReportsController],
      providers: [StoreReportsService],
    }).compile();

    controller = module.get<StoreReportsController>(StoreReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
