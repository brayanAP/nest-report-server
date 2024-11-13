import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';

@Controller('basic-report')
export class BasicReportController {
  constructor(private readonly basicReportService: BasicReportService) {}

  @Get('employment-letter/:id')
  async getEmploymentLetterById(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const doc = await this.basicReportService.getEmploymentLetter(+id);
    response.setHeader('Content-Type', 'application/pdf');
    doc.info.Title = 'Employment Letter';
    doc.pipe(response);
    doc.end();
  }
}
