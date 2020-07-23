import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Sensor} from '../../../../models/sensor.model';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorCardComponent {

  @Input() sensor: Sensor;
  @Input() isSelected: boolean;
  @Output() selectedSensorId: EventEmitter<any>;

  constructor() {
    this.selectedSensorId = new EventEmitter<any>();
  }

  selectSensor(sensorId) {
    this.selectedSensorId.emit(sensorId);
  }

  getImageUrl(sensorImage: string) {
    return `./../../../assets/${sensorImage}`;
  }
}
