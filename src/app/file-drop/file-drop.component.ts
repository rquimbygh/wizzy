import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DragDropDirective } from '../directives/drag-drop/drag-drop.directive';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss'],
  providers: [ DragDropDirective],
})
export class FileDropComponent {

  @Output() onFileUpload$ = new EventEmitter();

  @ViewChild('file-drop', {static: false}) fileDrop: ElementRef;

  constructor(private dragDropDirective: DragDropDirective) { }

  uploadFile(event: FileList) {
    if (event.length > 0) {
      this.onFileUpload$.emit(event)
    }
  }

}
