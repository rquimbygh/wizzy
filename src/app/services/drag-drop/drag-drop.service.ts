import { Injectable, Output, HostBinding, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  fs: any;

  constructor() {
    this.fs = (window as any).fs;

    // electron.ipcRenderer.on('getFileResponse', this.getFileResponse);
   }

  @Output() onFileDropped = new BehaviorSubject<File[]>([]);
	
  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'
	
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }
	
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }
	
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length === 1) {
      this.openFile(files[0].path);
    }
  }

  public openFile(path: string) {
    return this.fs.readFileSync(path);
    // electron.ipcRenderer.send('openFile', path);
  }

 /*  getFileResponse(event, files) {
    this.onFileDropped.next(files);
  } */

}
