import { PDFLinkService } from 'pdfjs-dist/lib/web/pdf_link_service';

export class MyLinkService extends PDFLinkService {
    constructor(
        public _page: number = 1,
        public _pdfDocument = null,
    ) {
      super();
    }
  
    setDocument(pdfDocument) {
      this._pdfDocument = pdfDocument;
    }
  
    get pagesCount() {
      return this._pdfDocument.numPages;
    }
  
    get page() {
      return this._page;
    }
  
    set page(value) {
      this._page = value;
    }
  }