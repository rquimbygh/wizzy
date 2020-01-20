import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  public document;

  // private cards = [];
  cards = [
    { title: 'Card 1', cols: 1, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
  ];

  constructor() {}

  onFileOpen(files: FileList) {
    // TODO - load PDF in card
    console.log('onFileOpen --> TODO open file in card');
    if (files.length === 1) {
      this.document = files[0];
    }
  }
}
