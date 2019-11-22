import {get, getModelSchemaRef, param, Request, RestBindings} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {inject} from '@loopback/context';
import {Status} from '../models';
import {MeasurementRepository} from '../repositories';
import {HAPPINESS_CALCULATOR_SERVICE, HappinessCalculatorService} from '../services/happinessCalculator.service';

const uuid = require('uuid/v4');

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
  async status(@param.path.number('homebaseId') homebaseId: number): Promise<Status[]> {
    const status = new Status();
    status.id = uuid();
    status.homebaseId = homebaseId;
    status.timestamp = Date.now();

    const lastMeasurements = await this.measurementRepository.find({
      where: {homebaseId},
      order: ['timestamp ASC'],
      limit: 30,
    });

    const results = this.happinessCalculator.calculate(lastMeasurements);
    return Promise.resolve(results);
  }
}
