import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { footerSection } from './sections/footer.section';
import { countries as Country } from '@prisma/client';

interface CountriesOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountriesReport = ({
  title,
  subtitle,
  countries,
}: CountriesOptions): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    pageMargins: [40, 120, 40, 60],
    header: headerSection({
      showDate: true,
      showLogo: true,
      title,
      subtitle,
    }),
    footer: footerSection,
    content: [
      {
        layout: 'blueHeaderLayout',
        margin: [0, 0, 0, 40],
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            ['Id', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              {
                text: country.name,
                bold: true,
              },
              country.continent,
              country.local_name,
            ]),
          ],
        },
      },
      {
        text: 'Totales',
        margin: [0, 0, 0, 10],
        style: {
          fontSize: 18,
          bold: true,
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: ['auto', 20, 'auto', '*', '*', '*'],
          body: [
            [
              {
                text: 'Total de países',
                bold: true,
              },
              {},
              {
                text: `${countries.length} países`,
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };

  return docDefinition;
};
