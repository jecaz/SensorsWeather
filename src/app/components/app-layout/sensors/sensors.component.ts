import {Component} from '@angular/core';
import {Observable} from 'rxjs/index';
import SensorState from '../../../store/states/sensor.state';
import { select, Store } from '@ngrx/store';
import * as fromSensors from '../../../store/selectors/sensors.selectors';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent {

  sensors$: Observable<SensorState>;

  constructor(private store: Store<{sensors: SensorState}>) {
    this.sensors$ = store.pipe(select(fromSensors.selectSensorsCollection));
  }
}
