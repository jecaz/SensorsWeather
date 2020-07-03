import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {SensorsComponent} from './sensors.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PipesModule} from '../../../pipes/pipe.module';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SensorCardModule} from '../sensor-card/sensor-card.module';

@NgModule({
  declarations: [
    SensorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    PipesModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    SensorCardModule
  ],
  exports: [SensorsComponent]
})
export class SensorsModule {
}
