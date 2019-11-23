import {Provider} from '@loopback/context';
import {HappinessCalculatorService, HappinessParameter} from '../services';
import {Measurement} from '../models';

export type GraphChart = {
  id: string;
  data: GraphValue[];
};

type GraphValue = {
  x: string;
  y: number;
};

export class HappinessCalculator implements HappinessCalculatorService {
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
      const time = new Date(new Date(measurement.timestamp).getTime()).toTimeString().split(' ')[0];

      const lightEntry = {
        x: time,
        y: measurement.light!,
      };
      lightChart.data.push(lightEntry);

      const volumeEntry = {
        x: time,
        y: measurement.volume!,
      };
      volumeChart.data.push(volumeEntry);

      const temperatureEntry = {
        x: time,
        y: measurement.temperature!,
      };
      temperatureChart.data.push(temperatureEntry);

      const humidityEntry = {
        x: time,
        y: measurement.humidity!,
      };
      humidityChart.data.push(humidityEntry);

      const dustEntry = {
        x: time,
        y: measurement.dust!,
      };
      dustChart.data.push(dustEntry);

      const gasEntry = {
        x: time,
        y: measurement.gas!,
      };
      gasChart.data.push(gasEntry);

      const happyStatus = {
        x: time,
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
