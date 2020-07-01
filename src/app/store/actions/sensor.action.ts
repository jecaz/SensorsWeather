
import {Sensor} from '../../models/sensor.model';
import { createAction, props } from '@ngrx/store';

export const GetSensorAction = createAction('[Sensor] - Get Sensor');

export const BeginGetSensorAction = createAction('[Sensor] - Begin Get Sensor');

export const SuccessGetSensorAction = createAction(
  '[Sensor] - Success Get Sensor',
  props<{ payload: Sensor[] }>()
);

export const ErrorSensorAction = createAction('[Sensor] - Error', props<Error>());

