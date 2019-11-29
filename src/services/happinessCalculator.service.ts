import {Measurement} from '../models';
import {BindingKey} from '@loopback/context';
import {GraphChart} from '../providers';

export interface HappinessParameter extends Array<Measurement> {}

export interface HappinessCalculatorService {
  calculate(args: HappinessParameter): Array<GraphChart>;
  calculateCurrent(args: HappinessParameter): Array<number>;
}

export const HAPPINESS_CALCULATOR_SERVICE = BindingKey.create<HappinessCalculatorService>(
  'services.happinessCalculatorService',
);
