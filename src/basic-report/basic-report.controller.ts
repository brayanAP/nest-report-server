import { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';

@Controller('basic-report')
export class BasicReportController {
  constructor(private readonly basicReportService: BasicReportService) {}

  @Get()
  async getBasicReport(@Res() response: Response) {
    const doc = await this.basicReportService.getBasicReport();
    response.setHeader('Content-Type', 'application/pdf');
    doc.info.Title = 'file.pdf';
    doc.pipe(response);
    doc.end();
  }
}
