import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getStoreReportByOrderId(
    @Param('orderId') orderId: string,
    @Res() response: Response,
  ) {
    const pdfDocument =
      await this.storeReportsService.getOrderReportByOrderId(+orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDocument.info.Title = `Store Report for Order #${orderId}`;
    pdfDocument.pipe(response);
    pdfDocument.end();
  }

  @Get('customers/statistics')
  async getCustomersStatistics(@Res() response: Response) {
    const pdfDocument = await this.storeReportsService.getCustomersStatistics();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDocument.info.Title = `Store Customers Statistics`;
    pdfDocument.pipe(response);
    pdfDocument.end();
  }

  @Get('sales/bill')
  async getSalesBill(@Res() response: Response) {
    const pdfDocument = await this.storeReportsService.getSalesBill();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDocument.info.Title = `Store Sales Bill`;
    pdfDocument.pipe(response);
    pdfDocument.end();
  }
}
