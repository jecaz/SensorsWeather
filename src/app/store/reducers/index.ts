
import {createFeatureSelector, createSelector} from '@ngrx/store';
import SensorState from '../states/sensor.state';

export const sensorsFeatureKey = 'sensors';

export const selectSensors = createFeatureSelector<SensorState>(sensorsFeatureKey);

export const selectSensorsCollection = createSelector(
  selectSensors,
  (state: SensorState) => state
);
