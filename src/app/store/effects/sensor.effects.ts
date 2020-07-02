import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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
      ofType(SensorActions.BeginGetSensorAction),
      mergeMap(action =>
        this.sensorsService.getSensors().pipe(
          map((sensors: Sensor[]) => {
            return SensorActions.SuccessGetSensorAction({ payload: sensors });
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
}
