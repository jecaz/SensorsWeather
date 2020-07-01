import {Sensor} from '../../models/sensor.model';

export default class SensorState {
  Sensors: Array<Sensor>;
  SensorError: Error;
}

export const initializeState = (): SensorState => {
  return { Sensors: Array<Sensor>(), SensorError: null };
};
