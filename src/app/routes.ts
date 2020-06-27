import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './components/app-layout/app-layout.component';

const appRoutes: Routes = [

  {path: '', component: AppLayoutComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export  class  AppLayoutRoutingModule { }



