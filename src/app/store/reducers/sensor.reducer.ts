
import {Action, createReducer, on} from '@ngrx/store';
import {initializeState} from '../states/sensor.state';
import SensorState from '../states/sensor.state';
import * as SensorActions from '../actions/sensor.action';
import {Sensor} from '../../models/sensor.model';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(SensorActions.GetSensorsAction, state => state),
  on(SensorActions.CreateSensorAction, (state: SensorState, sensor: Sensor) => {
    return { ...state, Sensors: [...state.Sensors, sensor], SensorError: null };
  }),
  on(SensorActions.UpdateSensorAction, (state: SensorState, sensor: Sensor) => {
    return { ...state, Sensors: [...state.Sensors, sensor], SensorError: null };
  }),
  on(SensorActions.DeleteSensorAction, (state: SensorState, sensor: Sensor) => {
    return { ...state, Sensors: [...state.Sensors, sensor], SensorError: null };
  }),
  on(SensorActions.SuccessGetSensorsAction, (state: SensorState, { payload }) => {
    return { ...state, Sensors: payload };
  }),
  on(SensorActions.SuccessCreateSensorAction, (state: SensorState, { payload }) => {
    return { ...state, Sensors: [...state.Sensors, payload], SensorError: null };
  }),
  on(SensorActions.SuccessDeleteSensorAction, (state: SensorState, { payload }) => {
    let sensors = null;
    if (typeof payload === 'number') {
      sensors = state.Sensors.filter(s => s.id !== payload);
    } else {
      sensors = state.Sensors.filter(s => !payload.includes(s.id));
    }
    return { ...state, Sensors: [...sensors], SensorError: null };
  }),
  on(SensorActions.SuccessUpdateSensorAction, (state: SensorState, { payload }) => {
    return { ...state, Sensors: [...state.Sensors, payload], SensorError: null };
  }),
  on(SensorActions.ErrorSensorAction, (state: SensorState, error: Error) => {
    console.log(error);
    return { ...state, SensorError: error };
  })
);

export function SensorReducer(state: SensorState | undefined, action: Action) {
  return reducer(state, action);
}
