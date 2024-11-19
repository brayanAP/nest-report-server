import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/doughnut.chart';
import { headerSection } from './sections/header.section';
import { footerSection } from './sections/footer.section';
import { getLineChart } from './charts/line.chart';
import * as Utils from '../helpers/chart-utils';

interface TopCountry {
  country: string;
  customers: number;
}

interface CustomersStatisticsOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

export const getCustomersStatisticsReport = async ({
  title,
  subtitle,
  topCountries,
}: CustomersStatisticsOptions): Promise<TDocumentDefinitions> => {
  const labels = Utils.months({ count: DATA_COUNT });
  const numbers = Utils.numbers(NUMBER_CFG);

  const [donutChart, lineChart] = await Promise.all([
    getDonutChart({
      entries: topCountries.map((country) => ({
        label: country.country,
        value: country.customers,
      })),
      position: 'left',
    }),
    getLineChart({
      entries: numbers.map((number, index) => ({
        label: labels[index],
        value: number,
      })),
    }),
  ]);

  const docDefinition: TDocumentDefinitions = {
    header: headerSection({
      showLogo: true,
      showDate: true,
      title: title || 'Estadísticas de clientes',
      subtitle: subtitle || 'Top 10 países con más clientes',
    }),
    pageMargins: [40, 120, 40, 40],
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Grafica de pais con mas clientes',
                alignment: 'center',
                margin: [0, 0, 0, 20],
                style: {
                  fontSize: 14,
                  bold: true,
                },
              },
              {
                image: donutChart,
                width: 350,
                height: 200,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['País', 'Clientes'],
                ...topCountries.map((country) => [
                  country.country,
                  country.customers,
                ]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
        height: 250,
        margin: [0, 20, 0, 0],
      },
    ],
    footer: footerSection,
  };

  return docDefinition;
};
