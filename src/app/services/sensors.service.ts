import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Sensor} from '../models/sensor.model';
import { map, retry, catchError } from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  API_URL: string = environment.urlSensors;
  selectedSensorId: BehaviorSubject<any>;
  confirmedDelete: Subject<any>;

  constructor(private http: HttpClient) {
    this.selectedSensorId = new BehaviorSubject('');
    this.confirmedDelete = new Subject();
  }

  getSelectedSensor() {
    return this.selectedSensorId.asObservable();
  }

  setSelectedSensor(id: any) {
    this.selectedSensorId.next(id);
  }

  getConfirmedDelete() {
    return this.confirmedDelete.asObservable();
  }

  setConfirmedDelete(confirmedObj: any) {
    this.confirmedDelete.next(confirmedObj);
  }

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.API_URL + '/sensors')
      .pipe(
        map(response => response.map(item => new Sensor(item)))
      );
  }

  createSensor(sensor: Sensor) {
    return this.http.post<Sensor>(this.API_URL + '/sensors', sensor)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getSensorById(id: any) {
    return this.http.get<Sensor>(`${this.API_URL}/sensors/${id}`)
      .pipe(
        map(response => new Sensor(response)),
        catchError(this.handleError)
      );
  }

  updateSensor(sensor: Sensor) {
    return this.http.put(`${this.API_URL}/sensors/${sensor.id}`, sensor)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSensorById(id: any) {
    return this.http.delete(`${this.API_URL}/sensors/${id}`)
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
