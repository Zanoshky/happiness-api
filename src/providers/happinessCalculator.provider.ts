import { Provider } from '@loopback/context';
import { HappinessCalculatorService, HappinessParameter } from '../services';
import { Status } from '../models';

export class HappinessCalculator implements HappinessCalculatorService {
  calculate(parameter: HappinessParameter): Array<Status> {
    const results: Status[] = [];

    parameter.forEach(param => {
      const status = new Status();
      status.homebaseId = param.homebaseId;
      status.timestamp = param.timestamp;
      status.volume = param.volume;
      status.light = param.light;
      status.humidity = param.humidity;
      status.gas = param.gas;
      status.dust = param.dust;
      status.temperature = param.temperature;

      // TODO Magic here
      status.happiness = 5;


      results.push(status);
    });

    return results;
  }
}



export class HappinessCalculatorServiceProvider implements Provider<HappinessCalculatorService> {
  constructor(public calculator: HappinessCalculatorService = new HappinessCalculator()) { }

  value(): HappinessCalculatorService {
    return this.calculator;
  }
}
