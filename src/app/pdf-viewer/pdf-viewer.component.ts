import { Component, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';

declare var pdfjsLib: any;

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements AfterViewInit {

  @ViewChild('canvas', {static: false}) private canvas: ElementRef;
  public context: CanvasRenderingContext2D;

  @Input()
  set document(doc: File) {
    if (doc) {
      this.loadPdf(doc);
    }
  }
  private pdf: any;
  private zoom = { scale: 1.0 };
  private currentPage; number = 1;

  constructor(private fileSystemService: FileSystemService) {
    pdfjsLib.workerSrc = "../../assets/pdf.min.js"
   }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
  }

  loadPdf(file: any) {
    var rawData = this.fileSystemService.getFileRawData(file.path);

    pdfjsLib.getDocument(rawData).then((pdf) => {
      console.log("# PDF document loaded.");
      this.pdf = pdf;
      this.render();
    });
  }

  render() {
    this.pdf.getPage(this.currentPage).then((page) => { 
      var viewport = page.getViewport(this.zoom);
      this.canvas.nativeElement.width = viewport.width;
      this.canvas.nativeElement.height = viewport.height;
      page.render({
        canvasContext: this.context,
        viewport: viewport
    });
  });
  }

}
