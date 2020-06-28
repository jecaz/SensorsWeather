import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {SensorsComponent} from './sensors.component';
import {CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    SensorsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [SensorsComponent]
})
export class SensorsModule {
}
