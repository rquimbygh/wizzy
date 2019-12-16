import { Component, ViewChild, ElementRef, Output, AfterViewInit } from '@angular/core';
import { DragDropService } from '../services/drag-drop/drag-drop.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent {

  @ViewChild('file-drop', {static: false}) fileDrop: ElementRef;
  @Output() fileOpen$ = new Subject<any>();

  constructor(private dragDropService: DragDropService) { }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.dragDropService.openFile(element.name);
    }  
  }

}
