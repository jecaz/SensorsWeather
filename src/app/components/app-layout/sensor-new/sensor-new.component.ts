import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Sensor} from '../../../models/sensor.model';
import {SensorsService} from '../../../services/sensors.service';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sensor-new',
  templateUrl: './sensor-new.component.html',
  styleUrls: ['./sensor-new.component.scss']
})
export class SensorNewComponent implements OnInit {

  form: FormGroup;
  typeDropdown: string[];
  imagesDropdown: any[];

  constructor(private sensorsService: SensorsService,
              private notificationService: NotificationService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.typeDropdown = ['FEED', 'ACTUATOR', 'ALARM'];
    this.imagesDropdown = [
      {label: 'Temperature', value: 'images/ico_temperature.svg'},
      {label: 'Humidity', value: 'images/ico_humidity.svg'},
      {label: 'Pressure', value: 'images/ico_pressure.svg'},
      {label: 'Light', value: 'images/ico_switcher.svg'},
      {label: 'Count', value: 'images/ico_slider.svg'},
      {label: 'Highway board', value: 'images/ico_string.svg'},
      {label: 'High Humidity', value: 'images/ico_alarm.svg'},
    ];
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      path: new FormControl('', Validators.required),
      unitSymbol: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      lastUpdate: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  getErrorMessage() {
    return 'Field is required';
  }

  validateForm(forma: FormGroup) {
    return forma.valid;
  }

  validateErrorMessages(forma: FormGroup) {
    Object.keys(forma.controls).forEach((name) => {
      const control: ValidationErrors = forma.controls[name].errors;
      if (control && control.required) {
        forma.controls[name].setErrors({ isRequired: true });
      }
    });
  }

  save() {
    if (!this.validateForm(this.form)) {
      this.validateErrorMessages(this.form);
      return;
    }
    const sensor: Sensor = new Sensor(this.form.getRawValue());
    this.sensorsService.createSensor(sensor).subscribe(data => {
      this.notificationService.openSnackBar('Sensor successfully created!', '', 'success');
      this.router.navigate(['../sensors'], { relativeTo: this.activeRoute });
    }, err => {
      this.notificationService.openSnackBar(err, '', 'error');
    });
  }
}
