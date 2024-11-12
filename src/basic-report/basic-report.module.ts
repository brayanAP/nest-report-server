import { Module } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';
import { BasicReportController } from './basic-report.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  imports: [PrinterModule],
  controllers: [BasicReportController],
  providers: [BasicReportService],
})
export class BasicReportModule {}
