import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {SensorsService} from '../../../services/sensors.service';
import {Sensor} from '../../../models/sensor.model';
import {NotificationService} from '../../../services/notification.service';

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

  constructor(private sensorsService: SensorsService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.typeDropdown = [];
    this.getSensors();
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
