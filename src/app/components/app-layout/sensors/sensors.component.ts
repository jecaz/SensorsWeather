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
  subscriptions: Subscription[] = [];

  constructor(private sensorsService: SensorsService) { }

  ngOnInit(): void {
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
      console.log(data, 'sensors');
      this.sensors = data;
    });
  }

}
