import { DynamicContent } from 'pdfmake/interfaces';

export const footerSection: DynamicContent = (currentPage, pageCount) => ({
  text: `Página ${currentPage} de ${pageCount}`,
  alignment: 'right',
  fontSize: 12,
  bold: true,
  margin: [0, 10, 35, 0],
});
