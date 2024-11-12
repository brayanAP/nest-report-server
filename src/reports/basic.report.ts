import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getBasicReport = () => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: 'Hello world!',
      },
    ],
  };

  return docDefinition;
};
