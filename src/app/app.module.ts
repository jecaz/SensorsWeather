import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {AppLayoutRoutingModule} from './routes';
import {AppLayoutModule} from './components/app-layout/app-layout.module';
import {DialogModule} from './common/dialog/dialog.module';
import {DialogComponent} from './common/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppLayoutRoutingModule,
    AppLayoutModule,
    DialogModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
