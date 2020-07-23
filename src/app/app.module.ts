import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {AppLayoutRoutingModule} from './routes';
import {AppLayoutModule} from './components/app-layout/app-layout.module';
import {DialogModule} from './common/dialog/dialog.module';
import {DialogComponent} from './common/dialog/dialog.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {SensorReducer} from './store/reducers/sensor.reducer';
import {SensorEffects} from './store/effects/sensor.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppLayoutRoutingModule,
    AppLayoutModule,
    DialogModule,
    EffectsModule.forRoot([SensorEffects]),
    StoreModule.forRoot({ sensors: SensorReducer })
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
