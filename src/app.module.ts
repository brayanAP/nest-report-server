import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicReportModule } from './basic-report/basic-report.module';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';

@Module({
  imports: [BasicReportModule, PrinterModule, StoreReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
