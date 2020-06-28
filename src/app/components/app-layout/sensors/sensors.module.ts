import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {SensorsComponent} from './sensors.component';
import {CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {PipesModule} from '../../../pipes/pipe.module';
import {MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    SensorsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    PipesModule,
    MatTooltipModule
  ],
  exports: [SensorsComponent]
})
export class SensorsModule {
}
