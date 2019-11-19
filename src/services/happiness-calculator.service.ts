import {Measurement} from "../models";
import {bind, BindingScope} from "@loopback/context";

export interface Happiness {
  value: number;
}

export interface HappinessParameters extends Array<Measurement> {
}

export interface HappinessCalculatorService {
  calculateHappiness(args: HappinessParameters): Promise<Happiness>;
}


@bind({scope: BindingScope.SINGLETON})
export class HappinessCalculatorServiceProvider implements HappinessCalculatorService {
  calculateHappiness(args: HappinessParameters): Promise<Happiness> {
    return new Promise<Happiness>(resolve => 5);
  }
}
