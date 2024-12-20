import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getCountriesReport } from 'src/reports/countries.report';
import { getEmploymentLetter } from 'src/reports/employment-letter.report';

@Injectable()
export class BasicReportService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async getEmploymentLetter(id: number) {
    const employee = await this.employees.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    const docDefinition = getEmploymentLetter({
      employerName: 'John Doe',
      employerPosition: 'CEO',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Inc.',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: { local_name: { not: null } },
    });

    const docDefinition = getCountriesReport({
      title: 'Countries Report',
      subtitle: 'Report with all countries',
      countries,
    });

    const doc = this.printerService.createPdf(docDefinition as any);

    return doc;
  }
}
