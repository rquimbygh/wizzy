import { Component, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements AfterViewInit {
  pdfjsLib: any;

  @ViewChild('canvas', {static: false}) private canvas: ElementRef;
  public context: CanvasRenderingContext2D;

  @Input()
  set file(file: File) {
    if (file) {
      this.loadPdf(file);
    }
  }
  private pdf: any;
  private zoom = { scale: 1.0 };
  private currentPage: number = 1;

  constructor(private fileSystemService: FileSystemService) {
    this.pdfjsLib = (window as any).pdfjsLib;
    // this.pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/pdf.min.js"
    this.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${this.pdfjsLib.version}/pdf.worker.js`;
   }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
  }

  loadPdf(file: any) {
    var rawData = this.fileSystemService.getFileRawData(file.path);
    var loadingTask = this.pdfjsLib.getDocument(rawData);
    loadingTask.promise.then((pdf) => {
      console.log("# PDF document loaded.");
      this.pdf = pdf;
      this.render();
    });
  }

  render() {
    this.pdf.getPage(this.currentPage).then((page) => { 
      console.log("# Page ${this.currentPage} loaded.");
      var viewport = page.getViewport(this.zoom);
      this.canvas.nativeElement.width = viewport.width;
      this.canvas.nativeElement.height = viewport.height;
      page.render({
        canvasContext: this.context,
        viewport: viewport
    });
    page.getTextContent().then(textContent => {
      // https://stackoverflow.com/a/20522307
    });
  });
  }

}
