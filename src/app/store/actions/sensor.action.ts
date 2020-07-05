
import {Sensor} from '../../models/sensor.model';
import { createAction, props } from '@ngrx/store';
import {Pageable} from '../../models/pageable.model';

export const GetSensorsAction = createAction('[Sensor] - Get Sensors');

export const BeginGetSensorsAction = createAction(
  '[Sensor] - Begin Get Sensors',
  props<{ payload: Pageable }>()
);

export const SuccessGetSensorsAction = createAction(
  '[Sensor] - Success Get Sensors',
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

export const DeleteSensorAction = createAction(
  '[Sensor] - Delete Sensor',
  props<{ payload: Sensor }>()
);

export const BeginDeleteSensorAction = createAction(
  '[Sensor] - Begin Delete Sensor',
  props<{ payload: number | number[] }>()
);

export const SuccessDeleteSensorAction = createAction(
  '[Sensor] - Success Delete Sensor',
  props<{ payload: number | number[]}>()
);

export const ErrorSensorAction = createAction('[Sensor] - Error', props<Error>());

