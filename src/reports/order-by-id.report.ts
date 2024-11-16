import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { footerSection } from './sections/footer.section';
import { CurrencyFormatter } from 'src/helpers/currency-formatter';
import { DateFormatter } from 'src/helpers/date-formatter';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 20],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
};

interface OrderOptions {
  orderId: number;
  orderDate: Date;
  customerName: string;
  customerContactName: string;
  customerAddress: string;
  products: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  iva: number;
  total: number;
}

export const getOrderByIdReport = ({
  orderId,
  orderDate,
  customerName,
  customerContactName,
  customerAddress,
  products,
  subtotal,
  iva,
  total,
}: OrderOptions) => {
  const docDefinition: TDocumentDefinitions = {
    header: logo,
    pageMargins: [40, 40, 40, 60],
    styles,
    content: [
      {
        text: 'Tucan Code',
        style: 'header',
      },
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100, Ottawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://tucancode.com',
            alignment: 'left',
          },
          {
            text: [
              { text: `Recibo No#: ${orderId}\n`, bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(orderDate)}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
        margin: [0, 10, 0, 30],
      },
      {
        qr: 'text in QR',
        fit: 120,
        alignment: 'right',
      },
      {
        text: [
          { text: 'Cobrar a:\n', bold: true },
          `Razón Social: ${customerName}\n`,
          `Contacto: ${customerContactName}\n`,
          `Dirección: ${customerAddress}\n`,
        ],
        margin: [0, 0, 0, 20],
      },
      {
        layout: 'headerLineOnly',
        margin: [0, 0, 0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio unitario', 'Total'],
            ...products.map((product) => [
              product.id,
              product.name,
              product.quantity,
              CurrencyFormatter.formatCurrency(product.price),
              {
                text: CurrencyFormatter.formatCurrency(
                  product.quantity * product.price,
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              widths: ['auto', 'auto'],
              body: [
                [
                  {
                    text: 'Subtotal:',
                    style: {
                      fontSize: 14,
                    },
                  },
                  {
                    text: CurrencyFormatter.formatCurrency(subtotal),
                    alignment: 'right',
                    style: {
                      fontSize: 14,
                    },
                  },
                ],
                [
                  {
                    text: 'IVA:',
                    style: {
                      fontSize: 14,
                    },
                  },
                  {
                    text: CurrencyFormatter.formatCurrency(iva),
                    alignment: 'right',
                    style: {
                      fontSize: 14,
                    },
                  },
                ],
                [
                  {
                    text: 'Total:',
                    bold: true,
                    style: {
                      fontSize: 16,
                    },
                  },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    alignment: 'right',
                    bold: true,
                    style: {
                      fontSize: 16,
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
    footer: footerSection,
  };

  return docDefinition;
};
