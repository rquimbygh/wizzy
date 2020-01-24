import { Component, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer.js';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements AfterViewInit {
  //pdfjsLib: any;
  @ViewChild('canvasContainer', { static: false}) private canvasContainer: ElementRef;
  @ViewChild('viewer', { static: false}) private canvasViewer: ElementRef;
  @ViewChild('canvas', {static: false}) private canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  // @ViewChild('viewerContainer', {static: false}) private container: ElementRef;
  // @ViewChild('viewer', {static: false}) private viewer: ElementRef;

  @Input()
  set file(file: File) {
    if (file) {
      this.loadPdf(file);
    }
  }
  @Input()
  set searchText(text: string) {
    if (text) {
      this.search(text);
    }
  }
  private pdfDocument: any;
  private zoom = { scale: 1.0 };
  private currentPage: number = 1;

  private pdfFindController: any;
  private pdfViewer: any;
  // styling help
  // https://code.tutsplus.com/tutorials/how-to-create-a-pdf-viewer-in-javascript--cms-32505

  constructor(private fileSystemService: FileSystemService) {
    // this.pdfjsLib = (window as any).pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = `pdfjs-dist/build/pdf.worker.js`;
   }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
  }

  loadPdf(file: any) {
    // var rawData = this.fileSystemService.getFileRawData(file.path);
    // const url = 'http://localhost:4200/assets/CV-2019.pdf';
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((pdf) => {
      console.log("# PDF document loaded.");
      this.pdfDocument = pdf;
      this.render();
      this.createTextLayerBuilder();

      const pdfLinkService = new pdfjsViewer.PDFLinkService((document as any).eventBus);
      pdfLinkService.setDocument(this.pdfDocument);
      // TODO setting a pdfViewer object for PDFLinkService
      // modify pdf_link_service.js to access the respective values from my viewer instead of the PDFViewer object

      this.pdfViewer = new pdfjsViewer.PDFViewer({
        container: this.canvasContainer.nativeElement,
        viewer: this.canvasViewer.nativeElement,
        linkService: pdfLinkService,
      });
      this.pdfFindController = new pdfjsViewer.PDFFindController({
        pdfViewer: this.pdfViewer,
        linkService: this.pdfViewer.linkService,
      });
      this.pdfViewer.findController = this.pdfFindController;
      this.pdfViewer.setDocument(this.pdfDocument);
    });
  }

  render() {
    this.pdfDocument.getPage(this.currentPage).then((page) => { 
      console.log("# Page ${this.currentPage} loaded.");
      var viewport = page.getViewport(this.zoom);
      this.canvas.nativeElement.width = viewport.width;
      this.canvas.nativeElement.height = viewport.height;
      page.render({
        canvasContext: this.context,
        viewport: viewport
      });
    });
  }

  createTextLayerBuilder() {
    this.pdfDocument.getPage(this.currentPage).then((page) => {
      page.getTextContent().then(function(textContent)
      {
          var textLayerId = "textLayerP"+page.pageIndex;
          var textLayer = document.createElement('div');
          textLayer.className = "textLayer";
          textLayer.id = textLayerId;
          document.getElementById('MAINDISPLAY-'+page.pageIndex).appendChild(textLayer);
          var textLayerBuilder = new pdfjsLib.TextLayerBuilder({
             textLayerDiv: textLayer,
             eventBus: (document as any).eventBus,
             pageIndex: page.pageIndex,
             viewport: page.getViewport(this.zoom),
             enhanceTextSelection: false,
          });
          textLayerBuilder.setTextContent(textContent);
          textLayerBuilder.render();
      });
    })
  }

  // possibly helpful
  // https://github.com/mozilla/pdf.js/blob/93aa613db7a874e6ed964f394241605d5586c142/web/pdf_find_controller.js
  async search(searchText: string) {
    const parameters = {
      query: searchText,
      caseSensitive: false,
      entireWord: false,
      phraseSearch: true,
      findPrevious: undefined,
      highlightAll: true,
    };
    this.pdfFindController.executeCommand("find", parameters); 
  }

}
