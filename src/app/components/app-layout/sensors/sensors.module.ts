import {NgModule} from '@angular/core';
import {SensorsComponent} from './sensors.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PipesModule} from '../../../pipes/pipe.module';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SensorGridViewModule} from './sensor-grid-view/sensor-grid-view.module';
import {RouterModule, Routes} from '@angular/router';
import {SensorGridViewComponent} from './sensor-grid-view/sensor-grid-view.component';
import {SensorCardsViewComponent} from './sensor-cards-view/sensor-cards-view.component';
import {SensorCardsViewModule} from './sensor-cards-view/sensor-cards-view.module';

const routes: Routes = [
  { path: '', component: SensorsComponent,
    children: [
      { path: '', redirectTo: 'card', pathMatch: 'full' },
      { path: 'card', component: SensorCardsViewComponent },
      { path: 'grid', component: SensorGridViewComponent }
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
    SensorGridViewModule,
    SensorCardsViewModule,
    RouterModule.forChild(routes)
  ],
  exports: [SensorsComponent]
})
export class SensorsModule {
}
