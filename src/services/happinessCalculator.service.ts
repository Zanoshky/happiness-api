import {Measurement} from "../models";
import {BindingKey} from "@loopback/context";

export interface HappinessParameters extends Array<Measurement> {
}

export interface HappinessCalculatorService {
  calculate(args: HappinessParameters): number;
}

export const HAPPINESS_CALCULATOR_SERVICE = BindingKey.create<HappinessCalculatorService>(
    'services.happinessCalculatorService'
);
