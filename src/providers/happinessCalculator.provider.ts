import {Provider} from '@loopback/context';
import {HappinessCalculatorService, HappinessParameter} from '../services';
import {Measurement} from '../models';

export type GraphChart = {
  id: string;
  data: GraphValue[];
};

type GraphValue = {
  y: number;
};

export class HappinessCalculator implements HappinessCalculatorService {
  calculateCurrent(parameter: HappinessParameter): Array<number> {
    return [
      parameter[0].light!,
      parameter[0].volume!,
      parameter[0].temperature!,
      parameter[0].humidity!,
      parameter[0].dust!,
      parameter[0].gas!,
      this.calculateHappiness(parameter[0]),
    ];
  }

  calculate(parameter: HappinessParameter): Array<GraphChart> {
    const results: GraphChart[] = [];

    const lightChart: GraphChart = {id: 'Light', data: []};
    const volumeChart: GraphChart = {id: 'Volume', data: []};
    const temperatureChart: GraphChart = {id: 'Temprature', data: []};
    const humidityChart: GraphChart = {id: 'Humidity', data: []};
    const dustChart: GraphChart = {id: 'Dust', data: []};
    const gasChart: GraphChart = {id: 'Gas', data: []};
    const happinessChart: GraphChart = {id: 'Happiness', data: []};

    parameter.forEach(measurement => {
      const lightEntry = {
        y: measurement.light!,
      };
      lightChart.data.push(lightEntry);

      const volumeEntry = {
        y: measurement.volume!,
      };
      volumeChart.data.push(volumeEntry);

      const temperatureEntry = {
        y: measurement.temperature!,
      };
      temperatureChart.data.push(temperatureEntry);

      const humidityEntry = {
        y: measurement.humidity!,
      };
      humidityChart.data.push(humidityEntry);

      const dustEntry = {
        y: measurement.dust!,
      };
      dustChart.data.push(dustEntry);

      const gasEntry = {
        y: measurement.gas!,
      };
      gasChart.data.push(gasEntry);

      const happyStatus = {
        y: this.calculateHappiness(measurement),
      };

      happinessChart.data.push(happyStatus);
    });

    results.push(lightChart, volumeChart, temperatureChart, dustChart, gasChart, humidityChart, happinessChart);

    return results;
  }

  calculateHappiness(parameter: Measurement): number {
    return Math.floor(Math.random() * 100);
  }
}

export class HappinessCalculatorServiceProvider implements Provider<HappinessCalculatorService> {
  constructor(public calculator: HappinessCalculatorService = new HappinessCalculator()) {}

  value(): HappinessCalculatorService {
    return this.calculator;
  }
}
