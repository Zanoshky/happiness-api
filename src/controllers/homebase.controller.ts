import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  requestBody,
} from '@loopback/rest';
import {Homebase} from '../models';
import {HomebaseRepository} from '../repositories';

export class HomebaseController {
  constructor(
    @repository(HomebaseRepository)
    public homebaseRepository : HomebaseRepository,
  ) {}

  @post('/homebases', {
    responses: {
      '200': {
        description: 'Homebase model instance',
        content: {'application/json': {schema: getModelSchemaRef(Homebase)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Homebase, {
            title: 'NewHomebase',
            exclude: ['id'],
          }),
        },
      },
    })
    homebase: Omit<Homebase, 'id'>,
  ): Promise<Homebase> {
    return this.homebaseRepository.create(homebase);
  }

  @get('/homebases', {
    responses: {
      '200': {
        description: 'Array of Homebase model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Homebase)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Homebase)) filter?: Filter<Homebase>,
  ): Promise<Homebase[]> {
    return this.homebaseRepository.find(filter);
  }

  @get('/homebases/{id}', {
    responses: {
      '200': {
        description: 'Homebase model instance',
        content: {'application/json': {schema: getModelSchemaRef(Homebase)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Homebase> {
    return this.homebaseRepository.findById(id);
  }
}
