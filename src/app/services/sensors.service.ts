import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Sensor} from '../models/sensor.model';
import { map, catchError } from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  API_URL: string = environment.urlSensors;
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

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.API_URL + '/sensors')
      .pipe(
        map(response => response.map(item => new Sensor(item)))
      );
  }

  createSensor(sensor: Sensor) {
    return this.http.post<Sensor>(this.API_URL + '/sensors', sensor);
  }

  getSensorById(id: any) {
    return this.http.get<Sensor>(`${this.API_URL}/sensors/${id}`)
      .pipe(
        map(response => new Sensor(response)),
        catchError(this.handleError)
      );
  }

  updateSensor(sensor: Sensor) {
    return this.http.put(`${this.API_URL}/sensors/${sensor.id}`, sensor);
  }

  deleteSensorById(id: any) {
    return this.http.delete(`${this.API_URL}/sensors/${id}`);
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
