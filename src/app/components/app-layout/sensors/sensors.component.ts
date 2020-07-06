import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs/index';
import {Sensor} from '../../../models/sensor.model';
import SensorState from '../../../store/states/sensor.state';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as SensorActions from '../../../store/actions/sensor.action';
import * as fromSensors from '../../../store/selectors/sensors.selectors';
import {SensorsService} from '../../../services/sensors.service';
import {Pageable} from '../../../models/pageable.model';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit, OnDestroy {

  sensors: Sensor[];
  searchValue: string;
  searchByType: string;
  subscriptions: Subscription[] = [];
  typeDropdown: string[];
  sensors$: Observable<SensorState>;
  isSliderChecked: boolean;

  constructor(private store: Store<{sensors: SensorState}>, private sensorService: SensorsService) {
    this.sensors$ = store.pipe(select(fromSensors.selectSensorsCollection));
  }

  ngOnInit(): void {
    this.isSliderChecked = false;
    this.typeDropdown = [];
    this.sub = this.sensors$
      .pipe(
        map(x => {
          this.sensors = x.Sensors;
          this.setTypeDropdown(this.sensors);
        })
      ).subscribe();
    this.sub = this.sensorService.getIsSliderChecked().subscribe(isChecked => {
      this.isSliderChecked = isChecked;
      if (this.isSliderChecked) {
        this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: new Pageable(0, 5, 'name', 'asc') }));
      } else {
        this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: null }));
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub ? sub.unsubscribe() : null);
    this.sensors = null;
  }

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  groupSensorsByType(sensors: Sensor[], key: string) {
    return sensors.reduce((sensor, item) => {
      const group = item[key];
      sensor[group] = sensor[group] || [];
      sensor[group].push(item);
      return sensor;
    }, {});
  }

  onSelectItem(event) {
    if (!event) {
      return;
    }
    this.searchByType = event.value;
  }

  setTypeDropdown(sensors: Sensor[]) {
    if (this.typeDropdown.length === 0) {
      Object.keys(this.groupSensorsByType(sensors, 'type')).forEach(key => this.typeDropdown.push(key.toString()));
    }
  }
}
