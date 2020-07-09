import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SensorCardComponent} from './sensor-card.component';
import {PipesModule} from '../../../../pipes/pipe.module';

@NgModule({
  declarations: [
    SensorCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    PipesModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  exports: [SensorCardComponent]
})
export class SensorCardModule {
}
