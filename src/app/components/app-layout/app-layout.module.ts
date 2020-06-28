import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './app-layout.component';
import {MatToolbarModule} from '@angular/material';
import {SensorsModule} from './sensors/sensors.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    RouterModule,
    MatToolbarModule,
    SensorsModule
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
