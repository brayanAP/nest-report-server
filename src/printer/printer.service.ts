import { Injectable } from '@nestjs/common';
import PdfMakePrinter from 'pdfmake';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const fontDescriptors = {
  Roboto: {
    normal: 'fonts/Roboto/Roboto-Regular.ttf',
    bold: 'fonts/Roboto/Roboto-Medium.ttf',
    italics: 'fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class PrinterService {
  private printer: PdfMakePrinter = new PdfMakePrinter(fontDescriptors);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options?: BufferOptions,
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
