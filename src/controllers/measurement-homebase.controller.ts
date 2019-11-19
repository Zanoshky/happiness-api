import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Measurement,
  Homebase,
} from '../models';
import {MeasurementRepository} from '../repositories';

export class MeasurementHomebaseController {
  constructor(
    @repository(MeasurementRepository)
    public measurementRepository: MeasurementRepository,
  ) { }

  @get('/measurements/{id}/homebase', {
    responses: {
      '200': {
        description: 'Homebase belonging to Measurement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Homebase)},
          },
        },
      },
    },
  })
  async getHomebase(
    @param.path.number('id') id: typeof Measurement.prototype.id,
  ): Promise<Homebase> {
    return this.measurementRepository.homebase(id);
  }
}
