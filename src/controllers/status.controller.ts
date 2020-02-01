import {get, getModelSchemaRef, param, Request, RestBindings} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {inject} from '@loopback/context';
import {Status, Measurement} from '../models';
import {MeasurementRepository} from '../repositories';
import {HAPPINESS_CALCULATOR_SERVICE, HappinessCalculatorService} from '../services/happinessCalculator.service';
import {GraphChart} from '../providers';

/**
 * TODO
 */
export class StatusController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(MeasurementRepository)
    private measurementRepository: MeasurementRepository,
    @inject(HAPPINESS_CALCULATOR_SERVICE)
    private happinessCalculator: HappinessCalculatorService,
  ) {}

  // Map to `GET /status/{homebaseId}` for a specific home base
  @get('/status/{homebaseId}', {
    responses: {
      '200': {
        description: 'Array of Statuses',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Status)},
          },
        },
      },
    },
  })
  async status(@param.path.number('homebaseId') homebaseId: number): Promise<GraphChart[]> {
    const lastMeasurements = await this.measurementRepository.find({
      where: {homebaseId},
      order: ['timestamp DESC'],
      limit: 1,
    });

    const results = this.happinessCalculator.calculate(lastMeasurements.reverse());
    return Promise.resolve(results);
  }

  // Map to `GET /status/{homebaseId}` for a specific home base
  @get('/measurements/{homebaseId}/{humidity}/{temperature}/{dust}/{gas}/{pressure}/{volume}/{light}', {
    responses: {
      '200': {
        description: 'Insert of new measurement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Measurement)},
          },
        },
      },
    },
  })
  async insertStatus(
    @param.path.number('homebaseId') homebaseId: number,
    @param.path.number('humidity') humidity: number,
    @param.path.number('temperature') temperature: number,
    @param.path.number('dust') dust: number,
    @param.path.number('gas') gas: number,
    @param.path.number('pressure') pressure: number,
    @param.path.number('volume') volume: number,
    @param.path.number('light') light: number,
  ): Promise<Measurement> {
    const measurement = {
      homebaseId,
      humidity,
      temperature,
      gas,
      dust,
      pressure,
      volume,
      light,
    };

    return this.measurementRepository.create(measurement);
  }
}
