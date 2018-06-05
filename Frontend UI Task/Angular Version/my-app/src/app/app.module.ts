import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ModalModule} from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';

import { UploadPhotosComponent } from './upload-photos/upload-photos.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadPhotosComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
