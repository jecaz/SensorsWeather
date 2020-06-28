import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Sensor} from '../models/sensor.model';
import { map, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  createSensor(sensor: Sensor) {
    return this.http.post<Sensor>(this.SERVER_URL + '/sensors', sensor)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
