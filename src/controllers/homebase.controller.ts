import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
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

  @get('/homebases/count', {
    responses: {
      '200': {
        description: 'Homebase model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Homebase)) where?: Where<Homebase>,
  ): Promise<Count> {
    return this.homebaseRepository.count(where);
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

  @patch('/homebases', {
    responses: {
      '200': {
        description: 'Homebase PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Homebase, {partial: true}),
        },
      },
    })
    homebase: Homebase,
    @param.query.object('where', getWhereSchemaFor(Homebase)) where?: Where<Homebase>,
  ): Promise<Count> {
    return this.homebaseRepository.updateAll(homebase, where);
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

  @patch('/homebases/{id}', {
    responses: {
      '204': {
        description: 'Homebase PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Homebase, {partial: true}),
        },
      },
    })
    homebase: Homebase,
  ): Promise<void> {
    await this.homebaseRepository.updateById(id, homebase);
  }

  @put('/homebases/{id}', {
    responses: {
      '204': {
        description: 'Homebase PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() homebase: Homebase,
  ): Promise<void> {
    await this.homebaseRepository.replaceById(id, homebase);
  }

  @del('/homebases/{id}', {
    responses: {
      '204': {
        description: 'Homebase DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.homebaseRepository.deleteById(id);
  }
}
