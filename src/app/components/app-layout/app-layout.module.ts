import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './app-layout.component';
import {MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    MatToolbarModule
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
