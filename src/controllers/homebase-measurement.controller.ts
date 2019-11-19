import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Homebase,
  Measurement,
} from '../models';
import {HomebaseRepository} from '../repositories';

export class HomebaseMeasurementController {
  constructor(
    @repository(HomebaseRepository) protected homebaseRepository: HomebaseRepository,
  ) { }

  @get('/homebases/{id}/measurements', {
    responses: {
      '200': {
        description: 'Array of Measurement\'s belonging to Homebase',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Measurement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Measurement>,
  ): Promise<Measurement[]> {
    return this.homebaseRepository.measurements(id).find(filter);
  }

  @post('/homebases/{id}/measurements', {
    responses: {
      '200': {
        description: 'Homebase model instance',
        content: {'application/json': {schema: getModelSchemaRef(Measurement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Homebase.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Measurement, {
            title: 'NewMeasurementInHomebase',
            exclude: ['id'],
            optional: ['homebaseId']
          }),
        },
      },
    }) measurement: Omit<Measurement, 'id'>,
  ): Promise<Measurement> {
    return this.homebaseRepository.measurements(id).create(measurement);
  }
}
