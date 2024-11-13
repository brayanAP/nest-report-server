import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers/date-formatter';

interface HeaderSectionOptions {
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = ({
  showLogo,
  showDate,
}: HeaderSectionOptions): Content => ({
  columns: [
    showLogo
      ? {
          image: 'src/assets/tucan-code-logo.png',
          width: 100,
          height: 100,
          margin: [0, 0, 0, 20],
        }
      : null,
    showDate
      ? {
          text: DateFormatter.getDDMMMMYYYY(new Date()),
          margin: [20, 20],
          style: {
            fontSize: 14,
            bold: true,
            alignment: 'right',
          },
        }
      : null,
  ],
});
