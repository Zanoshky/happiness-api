import {Measurement, Status} from '../models';
import {BindingKey} from '@loopback/context';

export interface HappinessParameter extends Array<Measurement> {}

export interface HappinessCalculatorService {
  calculate(args: HappinessParameter): Array<Status>;
}

export const HAPPINESS_CALCULATOR_SERVICE = BindingKey.create<HappinessCalculatorService>(
  'services.happinessCalculatorService',
);
