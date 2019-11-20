import {Provider} from "@loopback/context";
import {HappinessCalculatorService, HappinessParameters} from "../services";

export class HappinessCalculator implements HappinessCalculatorService {
  calculate(args: HappinessParameters): number {
    // TODO Magic here
    return 5;
  }
}

export class HappinessCalculatorServiceProvider implements Provider<HappinessCalculatorService> {
  constructor(public calculator: HappinessCalculatorService = new HappinessCalculator()) {
  }

  value(): HappinessCalculatorService {
    return this.calculator;
  }
}
