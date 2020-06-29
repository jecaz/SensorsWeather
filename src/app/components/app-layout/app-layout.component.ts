import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SensorsService} from '../../services/sensors.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  @ViewChild('editBtn', { static: true }) editButton: any;
  @ViewChild('deleteBtn', { static: true }) deleteButton: any;
  selectedSensorId: any;

  constructor(private sensorService: SensorsService,
              private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isDisabledButtons(true);
    this.sensorService.getSelectedSensor().subscribe(sensorId => {
      if (sensorId) {
        this.selectedSensorId = sensorId;
        this.isDisabledButtons(false);
        this.cdref.detectChanges();
      }
    });
  }

  resetSelectedSensorId() {
    this.selectedSensorId = '';
    this.isDisabledButtons(true);
  }

  isDisabledButtons(isDisabled: boolean) {
    this.editButton._disabled = isDisabled;
    this.deleteButton._disabled = isDisabled;
  }
}
