import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  fs: any;

  constructor() {
    this.fs = (window as any).fs;
  }

  public getFileRawData(path: string): Uint8Array {
    return new Uint8Array(this.fs.readFileSync(path));
  }

}
