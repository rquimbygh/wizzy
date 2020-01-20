import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  @ViewChild('search-field', {static: false}) searchField: ElementRef;

  public files: File[] = [];

  constructor() {}

  onFileOpen(files: FileList) {
    // TODO - load PDF in card
    console.log('onFileOpen --> TODO open file in card');
    this.files.push(files[0]);
  }

  onSearch() {
    console.log('onSearch clicked');
  }
}
