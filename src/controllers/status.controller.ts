import {get, getModelSchemaRef, param, Request, RestBindings} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {inject} from '@loopback/context';
import {Status} from "../models";
import {MeasurementRepository} from '../repositories';
import {HappinessCalculatorService} from '../services/happiness-calculator.service';

const uuid = require('uuid/v4');

/**
 * TODO
 */
export class StatusController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request,
              @repository(MeasurementRepository) private measurementRepository: MeasurementRepository,
              @inject('services.HappinessCalculatorProvider') private happinessCalculator: HappinessCalculatorService
  ) {
  }

  // Map to `GET /status/{homebaseId}` for a specific home base
  @get('/status/{homebaseId}', {
    responses: {
      '200': {
        description: 'Status model instance',
        content: {'application/json': {schema: getModelSchemaRef(Status)}},
      },
    },
  })
  async status(@param.path.number('homebaseId') homebaseId: number): Promise<Status> {
    const status = new Status();
    status.id = uuid();
    status.homebaseId = homebaseId;
    status.timestamp = Date.now();

    const lastMeasurements = await this.measurementRepository.find({
      where: {homebaseId},
      order: ['timestamp DESC'],
      limit: 30
    });

    console.log(lastMeasurements);

    const happiness = await this.happinessCalculator.calculateHappiness(lastMeasurements);

    status.dust = 1;
    status.gas = 2;
    status.humidity = 3;
    status.light = 5;
    status.volume = 6;
    status.happiness = happiness.value;

    return Promise.resolve(status);
  }
}
