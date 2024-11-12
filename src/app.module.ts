import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicReportModule } from './basic-report/basic-report.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [BasicReportModule, PrinterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
