import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Sensor} from '../models/sensor.model';
import { map, catchError } from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Pageable} from '../models/pageable.model';
import {switchMap, take} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  API_URL: string = environment.apiUrl;
  selectedSensorId: BehaviorSubject<any>;
  isSliderChecked: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.selectedSensorId = new BehaviorSubject('');
    this.isSliderChecked = new BehaviorSubject(false);
  }

  getSelectedSensor() {
    return this.selectedSensorId.asObservable();
  }

  setSelectedSensor(id: any) {
    this.selectedSensorId.next(id);
  }

  getIsSliderChecked() {
    return this.isSliderChecked.asObservable();
  }

  setIsSliderChecked(isChecked: boolean) {
    this.isSliderChecked.next(isChecked);
  }

  getSensors(pagination?: Pageable): Observable<Sensor[]> {
    let params = {};
    if (pagination) {
      params = new HttpParams().set('_page', pagination.pageIndex)
        .set('_limit', pagination.pageSize)
        .set('_sort', pagination.sort)
        .set('_order', pagination.order)
        .set('name_like', pagination.search ? pagination.search : '');
    }
    return this.http.get<Sensor[]>(this.API_URL + '/sensors', { params, observe: 'response' })
      .pipe(
        map(response => response.body.map(item => {
          const totalSensorCount  = +response.headers.get('X-Total-Count');
          return new Sensor({...item, totalSensorCount});
        }))
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

  deleteAll(sensors: Sensor[]) {
    let s: Sensor[];
    return this.getSensors().pipe(
      take(1),
      switchMap(sensorsAll => {
        // find all that remain after delete
        s = sensorsAll.filter(sensor1 => {
          return !sensors.some(sensor2 => {
            return sensor1.id === sensor2.id;
          });
        });
        return this.http.post(this.API_URL + '/reset', {sensors: s}, { responseType: 'text' as 'json' });
      })
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
