import {NgModule} from '@angular/core';
import {SensorsComponent} from './sensors.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PipesModule} from '../../../pipes/pipe.module';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SensorCardModule} from './sensor-card/sensor-card.module';
import {SensorGridModule} from './sensor-grid/sensor-grid.module';
import {RouterModule, Routes} from '@angular/router';
import {SensorCardComponent} from './sensor-card/sensor-card.component';
import {SensorGridComponent} from './sensor-grid/sensor-grid.component';

const routes: Routes = [
  { path: '', component: SensorsComponent,
    children: [
      { path: '', redirectTo: 'card', pathMatch: 'full' },
      { path: 'grid', component: SensorGridComponent },
      { path: 'card', component: SensorCardComponent }
    ]
  }
];

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
    SensorCardModule,
    SensorGridModule,
    RouterModule.forChild(routes)
  ],
  exports: [SensorsComponent]
})
export class SensorsModule {
}
