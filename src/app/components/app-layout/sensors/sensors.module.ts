import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {SensorsComponent} from './sensors.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PipesModule} from '../../../pipes/pipe.module';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SensorsComponent
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
  exports: [SensorsComponent]
})
export class SensorsModule {
}
