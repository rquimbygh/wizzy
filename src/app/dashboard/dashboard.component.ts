import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  @ViewChild('searchField', {static: false}) searchField: ElementRef;

  public files: File[] = [];
  public searchText: string;

  constructor() {}

  onFileOpen(files: FileList) {
    // TODO - load PDF in card
    console.log('onFileOpen --> TODO open file in card');
    this.files.push(files[0]);
  }

  onSearch() {
    console.log('onSearch clicked');
    this.searchText = this.getSearchText();
  }

  getSearchText(): string {
    if (!this.searchField || !this.searchField.nativeElement) {
      return null;
    }
    return this.searchField.nativeElement.value; 
  }
}
