import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs/index';
import {SensorsService} from '../../../services/sensors.service';
import {Sensor} from '../../../models/sensor.model';
import {NotificationService} from '../../../services/notification.service';
import SensorState from '../../../store/states/sensor.state';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as SensorActions from '../../../store/actions/sensor.action';

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
  selectedSensorId: Sensor;

  sensors$: Observable<SensorState>;
  sensorsSubscription: Subscription;
  todoError: Error = null;

  constructor(private sensorsService: SensorsService,
              private notificationService: NotificationService,
              private store: Store<{sensors: SensorState}>) {
    this.sensors$ = store.pipe(select('sensors'));
  }

  ngOnInit(): void {
    this.typeDropdown = [];
    this.sub = this.sensors$
      .pipe(
        map(x => {
          this.sensors = x.Sensors;
          if (this.typeDropdown.length === 0) {
            Object.keys(this.groupSensorsByType(this.sensors, 'type')).forEach(key => this.typeDropdown.push(key.toString()));
          }
          this.todoError = x.SensorError;
        })
      ).subscribe();

    this.store.dispatch(SensorActions.BeginGetSensorAction());
    // this.getSensors();
    this.sensorsService.getConfirmedDelete().subscribe(confirmedDeleteId => this.deleteSensor(confirmedDeleteId));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub ? sub.unsubscribe() : null);
  }

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  getSensors() {
    this.sub = this.sensorsService.getSensors().subscribe(data => {
      this.sensors = data;
      if (this.typeDropdown.length === 0) {
        Object.keys(this.groupSensorsByType(data, 'type')).forEach(key => this.typeDropdown.push(key.toString()));
      }
    });
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

  selectSensor(sensorId) {
    if (this.selectedSensorId === sensorId) {
      this.selectedSensorId = null;
      this.sensorsService.setSelectedSensor('');
      return;
    }
    this.selectedSensorId = sensorId;
    this.sensorsService.setSelectedSensor(sensorId);
  }

  deleteSensor(id: any) {
    this.sub = this.sensorsService.deleteSensorById(id).subscribe(data => {
      this.getSensors();
      this.notificationService.openSnackBar('Sensor successfully deleted!', '', 'success');
    }, err => {
      this.notificationService.openSnackBar(err, '', 'error');
    });
  }
}
