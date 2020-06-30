import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './app-layout.component';
import {MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {SensorsModule} from './sensors/sensors.module';
import {RouterModule} from '@angular/router';
import {SensorNewModule} from './sensor-new/sensor-new.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DialogModule} from '../../common/dialog/dialog.module';

@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    RouterModule,
    MatToolbarModule,
    SensorsModule,
    SensorNewModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    DialogModule,
    MatTooltipModule
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
