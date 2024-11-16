import { Injectable } from '@nestjs/common';
import PdfMakePrinter from 'pdfmake';
import type {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

const fontDescriptors = {
  Roboto: {
    normal: 'fonts/Roboto/Roboto-Regular.ttf',
    bold: 'fonts/Roboto/Roboto-Medium.ttf',
    italics: 'fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

const customTableLayouts: Record<string, CustomTableLayout> = {
  blueHeaderLayout: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#aaa';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    fillColor: function (i) {
      if (i === 0) {
        return '#7b90be';
      }

      return i % 2 === 0 ? '#f3f3f3' : null;
    },
  },
};

@Injectable()
export class PrinterService {
  private printer: PdfMakePrinter = new PdfMakePrinter(fontDescriptors);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options?: BufferOptions,
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, {
      tableLayouts: customTableLayouts,
      ...options,
    });
  }
}
