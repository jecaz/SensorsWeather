import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Sensor} from '../../../models/sensor.model';
import {SensorsService} from '../../../services/sensors.service';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorCardComponent {

  @Input() sensor: Sensor;
  selectedSensorId: any;

  constructor(private sensorsService: SensorsService) { }

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
}
