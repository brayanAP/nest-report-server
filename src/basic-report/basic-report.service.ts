import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getBasicReport } from 'src/reports/basic.report';

@Injectable()
export class BasicReportService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async getBasicReport() {
    const docDefinition = getBasicReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
