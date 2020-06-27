import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Sensor} from '../models/sensor.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  SERVER_URL: string = environment.urlSensors;

  constructor(private http: HttpClient) { }

  getSensors() {
    return this.http.get<Sensor[]>(this.SERVER_URL + '/sensors')
      .pipe(
        map(response => response.map(item => new Sensor(item)))
      );
  }
}
