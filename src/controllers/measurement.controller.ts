import {Filter, repository} from '@loopback/repository';
import {get, getFilterSchemaFor, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {Measurement} from '../models';
import {MeasurementRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class MeasurementController {
  constructor(
    @repository(MeasurementRepository)
    public measurementRepository: MeasurementRepository,
  ) {}

  @secured(SecuredType.HAS_ANY_ROLE, ['ADMIN', 'IOT_DEVICE'])
  @post('/measurements', {
    responses: {
      '200': {
        description: 'Measurement model instance',
        content: {'application/json': {schema: getModelSchemaRef(Measurement)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Measurement, {
            title: 'NewMeasurement',
            exclude: ['id'],
          }),
        },
      },
    })
    measurement: Omit<Measurement, 'id'>,
  ): Promise<Measurement> {
    return this.measurementRepository.create(measurement);
  }

  @get('/measurements', {
    responses: {
      '200': {
        description: 'Array of Measurement model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Measurement)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Measurement))
    filter?: Filter<Measurement>,
  ): Promise<Measurement[]> {
    return this.measurementRepository.find(filter);
  }
}
