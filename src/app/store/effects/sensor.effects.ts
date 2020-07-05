import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { merge, Observable, of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SensorActions from '../actions/sensor.action';
import {Sensor} from '../../models/sensor.model';
import {SensorsService} from '../../services/sensors.service';

@Injectable()
export class SensorEffects {
  constructor(private sensorsService: SensorsService,
              private action$: Actions) {}

  GetSensors$: Observable<Action> = createEffect(() =>
      this.action$.pipe(
      ofType(SensorActions.BeginGetSensorsAction),
      mergeMap(action =>
        this.sensorsService.getSensors(action.payload).pipe(
          map((sensors: Sensor[]) => {
            return SensorActions.SuccessGetSensorsAction({ payload: sensors });
          }),
          catchError((error: Error) => {
            return of(SensorActions.ErrorSensorAction(error));
          })
        )
      )
    )
  );

  CreateSensor$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(SensorActions.BeginCreateSensorAction),
      mergeMap(action =>
        this.sensorsService.createSensor(action.payload).pipe(
          map((data: Sensor) => {
            return SensorActions.SuccessCreateSensorAction({ payload: data });
          }),
          catchError((error: any) => {
            return of(SensorActions.ErrorSensorAction(error));
          })
        )
      )
    )
  );

  UpdateSensor$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(SensorActions.BeginUpdateSensorAction),
      mergeMap(action =>
        this.sensorsService.updateSensor(action.payload).pipe(
          map((data: Sensor) => {
            return SensorActions.SuccessUpdateSensorAction({ payload: data });
          }),
          catchError((error: any) => {
            return of(SensorActions.ErrorSensorAction(error));
          })
        )
      )
    )
  );

  DeleteSensor$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(SensorActions.BeginDeleteSensorAction),
      mergeMap((action: any) => {
        // delete all
        if (typeof action.payload !== 'number') {
          const ids = [];
          action.payload.forEach(i => ids.push(this.sensorsService.deleteSensorById(i)));
          const observables: Observable<any>[] = ids;
          return merge(...observables).pipe(
            map(results => {
              return SensorActions.SuccessDeleteSensorAction({ payload: action.payload });
            }),
            catchError((error: any) => {
              return of(SensorActions.ErrorSensorAction(error));
            })
          );
        } else {
          // delete one
          return merge(this.sensorsService.deleteSensorById(action.payload)).pipe(
            map(results => {
              return SensorActions.SuccessDeleteSensorAction({ payload: action.payload });
            }),
            catchError((error: any) => {
              return of(SensorActions.ErrorSensorAction(error));
            })
          );
        }
      })
    )
  );
}
