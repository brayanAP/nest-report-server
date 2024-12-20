import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getCustomersStatisticsReport } from 'src/reports/customers-statistics.report';
import { getOrderByIdReport } from 'src/reports/order-by-id.report';
import { getSalesBillReport } from 'src/reports/sales-bill.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async getOrderReportByOrderId(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: {
          select: {
            customer_name: true,
            contact_name: true,
            address: true,
          },
        },
        order_details: {
          include: {
            products: {
              select: {
                product_name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const products = order.order_details.map((orderDetail) => ({
      id: orderDetail.product_id,
      name: orderDetail.products.product_name,
      quantity: orderDetail.quantity,
      price: orderDetail.products.price.toNumber(),
    }));

    const subtotal = products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0,
    );

    const iva = subtotal * 0.16;

    const total = subtotal + iva;

    const docDefinition = getOrderByIdReport({
      orderId,
      orderDate: order.order_date,
      customerName: order.customers.customer_name,
      customerContactName: order.customers.contact_name,
      customerAddress: order.customers.address,
      products,
      subtotal,
      iva,
      total,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCustomersStatistics() {
    const topTenCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const topCountries = topTenCountries.map((country) => ({
      country: country.country,
      customers: country._count,
    }));

    const docDefinition = await getCustomersStatisticsReport({ topCountries });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  getSalesBill() {
    const docDefinition = getSalesBillReport();
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
