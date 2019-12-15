import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [],
  providers: [],
  exports: []
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) { }

}
