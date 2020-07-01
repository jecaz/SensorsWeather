
import { Action, createReducer, on } from '@ngrx/store';
import {initializeState} from '../states/sensor.state';
import SensorState from '../states/sensor.state';
import * as SensorActions from '../actions/sensor.action';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(SensorActions.GetSensorAction, state => state),
  on(SensorActions.SuccessGetSensorAction, (state: SensorState, { payload }) => {
    return { ...state, Sensors: payload };
  }),
  on(SensorActions.ErrorSensorAction, (state: SensorState, error: Error) => {
    console.log(error);
    return { ...state, SensorError: error };
  })
);

export function SensorReducer(state: SensorState | undefined, action: Action) {
  return reducer(state, action);
}
