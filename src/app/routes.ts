import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './components/app-layout/app-layout.component';
import {SensorNewComponent} from './components/app-layout/sensor-new/sensor-new.component';

const appRoutes: Routes = [

  {path: '', component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'sensors', pathMatch: 'full' },
      { path: 'sensors', loadChildren: () => import('./components/app-layout/sensors/sensors.module').then(m => m.SensorsModule) },
      { path: 'sensor', component: SensorNewComponent },
      { path: 'sensor/:id', component: SensorNewComponent }
    ]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export  class  AppLayoutRoutingModule { }



