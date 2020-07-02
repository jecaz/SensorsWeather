
import {Sensor} from '../../models/sensor.model';
import { createAction, props } from '@ngrx/store';

export const GetSensorAction = createAction('[Sensor] - Get Sensor');

export const BeginGetSensorAction = createAction('[Sensor] - Begin Get Sensor');

export const SuccessGetSensorAction = createAction(
  '[Sensor] - Success Get Sensor',
  props<{ payload: Sensor[] }>()
);

export const CreateSensorAction = createAction(
  '[Sensor] - Create Sensor',
  props<{ payload: Sensor }>()
);

export const BeginCreateSensorAction = createAction(
  '[Sensor] - Begin Create Sensor',
  props<{ payload: Sensor }>()
);

export const SuccessCreateSensorAction = createAction(
  '[Sensor] - Success Create Sensor',
  props<{ payload: Sensor }>()
);

export const UpdateSensorAction = createAction(
  '[Sensor] - Update Sensor',
  props<{ payload: Sensor }>()
);

export const BeginUpdateSensorAction = createAction(
  '[Sensor] - Begin Update Sensor',
  props<{ payload: Sensor }>()
);

export const SuccessUpdateSensorAction = createAction(
  '[Sensor] - Success Update Sensor',
  props<{ payload: Sensor }>()
);

export const ErrorSensorAction = createAction('[Sensor] - Error', props<Error>());

