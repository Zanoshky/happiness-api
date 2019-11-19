import {get, getModelSchemaRef, param, Request, RestBindings} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {inject} from '@loopback/context';
import {Status} from "../models";
import {MeasurementRepository} from '../repositories';

const uuid = require('uuid/v4');

/**
 * TODO
 */
export class StatusController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request, @repository(MeasurementRepository)
              public measurementRepository: MeasurementRepository
  ) {
  }

  // Map to `GET /status/{id}` for a specific home base
  @get('/status/{id}', {
    responses: {
      '200': {
        description: 'Status model instance',
        content: {'application/json': {schema: getModelSchemaRef(Status)}},
      },
    },
  })
  async status(@param.path.number('id') id: number): Promise<Status> {
    const status = new Status();
    status.id = uuid();
    status.homebaseId = id;
    status.timestamp = Date.now();

    const lastMeasurements = await this.measurementRepository.find();

    console.log(lastMeasurements);

    status.dust = 1;
    status.gas = 2;
    status.humidity = 3;
    status.light = 5;
    status.volume = 6;
    status.happiness = 9001;

    return Promise.resolve(status);
  }
}
