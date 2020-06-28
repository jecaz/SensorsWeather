import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './components/app-layout/app-layout.component';
import {SensorsComponent} from './components/app-layout/sensors/sensors.component';
import {SensorNewComponent} from './components/app-layout/sensor-new/sensor-new.component';

const appRoutes: Routes = [

  {path: '', component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'sensors', pathMatch: 'full' },
      { path: 'sensors', component: SensorsComponent },
      { path: 'sensor', component: SensorNewComponent }
    ]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export  class  AppLayoutRoutingModule { }



