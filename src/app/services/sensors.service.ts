import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Sensor} from '../models/sensor.model';
import { map, retry, catchError } from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  SERVER_URL: string = environment.urlSensors;
  selectedSensorId: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.selectedSensorId = new BehaviorSubject('');
  }

  getSelectedSensor() {
    return this.selectedSensorId.asObservable();
  }

  setSelectedSensor(id: any) {
    this.selectedSensorId.next(id);
  }

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

  getSensorById(id: any) {
    const data = new HttpParams().set('id', id);
    return this.http.get<Sensor[]>(this.SERVER_URL + '/sensors', { params: data })
      .pipe(
        map(response => response.map(item => new Sensor(item))),
        catchError(this.handleError)
      );
  }

  updateSensor(sensor: Sensor) {
    console.log();
    return this.http.put(`${this.SERVER_URL}/sensors/${sensor.id}`, sensor)
      .pipe(
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
