import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {PipesModule} from '../../../../pipes/pipe.module';
import {SensorCardsViewComponent} from './sensor-cards-view.component';
import {SensorCardModule} from '../sensor-card/sensor-card.module';

@NgModule({
  declarations: [
    SensorCardsViewComponent
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
    MatIconModule,
    SensorCardModule
  ],
  exports: [SensorCardsViewComponent]
})
export class SensorCardsViewModule {
}
