import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {SensorsService} from '../../../services/sensors.service';
import {Sensor} from '../../../models/sensor.model';

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

  constructor(private sensorsService: SensorsService) { }

  ngOnInit(): void {
    this.typeDropdown = [];
    this.getSensors();
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
      Object.keys(this.groupSensorsByType(data, 'type')).forEach(key => this.typeDropdown.push(key.toString()));
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

}
