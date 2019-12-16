import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';

declare var pdfjsLib: any;

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements AfterViewInit {

  @ViewChild('pdf_renderer', {static: false}) canvas: ElementRef;
  public context: CanvasRenderingContext2D;

  @Input() document
  private pdf: any;
  private zoom: number;
  private currentPage; number;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    // this.loadPdf();
  }

  loadPdf() {
    pdfjsLib.getDocument('./my_document.pdf').then((pdf) => {
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
