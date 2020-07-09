import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs/index';
import SensorState from '../../../../store/states/sensor.state';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/internal/operators';
import {Sensor} from '../../../../models/sensor.model';
import {SensorsService} from '../../../../services/sensors.service';
import * as fromSensors from '../../../../store/selectors/sensors.selectors';
import * as SensorActions from '../../../../store/actions/sensor.action';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.scss']
})
export class SensorCardComponent implements OnInit, OnDestroy {

  selectedSensorId: any;
  sensors: Sensor[];
  searchValue: string;
  searchByType: string;
  subscriptions: Subscription[] = [];
  typeDropdown: string[];
  sensors$: Observable<SensorState>;

  constructor(private sensorsService: SensorsService,
              private store: Store<{sensors: SensorState}>) {
    this.sensors$ = store.pipe(select(fromSensors.selectSensorsCollection));
  }

  ngOnInit(): void {
    this.typeDropdown = [];
    this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: null }));
    this.sub = this.sensors$
      .pipe(
        map(x => {
          this.sensors = x.Sensors;
          this.setTypeDropdown(this.sensors);
        })
      ).subscribe();
  }



  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub ? sub.unsubscribe() : null);
  }

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  selectSensor(sensorId) {
    if (this.selectedSensorId === sensorId) {
      this.setSelectSensorId('');
      return;
    }
    this.setSelectSensorId(sensorId);
  }

  setSelectSensorId(sensorId) {
    this.selectedSensorId = sensorId;
    this.sensorsService.setSelectedSensor(sensorId);
  }

  groupSensorsByType(sensors: Sensor[], key: string) {
    return sensors.reduce((sensor, item) => {
      const group = item[key];
      sensor[group] = sensor[group] || [];
      sensor[group].push(item);
      return sensor;
      return sensor;
    }, {});
  }

  onSelectDropdownItem(event) {
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
