import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Contador} from '../models';
import {ContadorRepository} from '../repositories';

export class ContadorController {
  constructor(
    @repository(ContadorRepository)
    public contadorRepository : ContadorRepository,
  ) {}

  @post('/contadors')
  @response(200, {
    description: 'Contador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contador, {
            title: 'NewContador',
            exclude: ['id'],
          }),
        },
      },
    })
    contador: Omit<Contador, 'id'>,
  ): Promise<Contador> {
    return this.contadorRepository.create(contador);
  }

  @get('/contadors/count')
  @response(200, {
    description: 'Contador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contador) where?: Where<Contador>,
  ): Promise<Count> {
    return this.contadorRepository.count(where);
  }

  @get('/contadors')
  @response(200, {
    description: 'Array of Contador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contador) filter?: Filter<Contador>,
  ): Promise<Contador[]> {
    return this.contadorRepository.find(filter);
  }

  @patch('/contadors')
  @response(200, {
    description: 'Contador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contador, {partial: true}),
        },
      },
    })
    contador: Contador,
    @param.where(Contador) where?: Where<Contador>,
  ): Promise<Count> {
    return this.contadorRepository.updateAll(contador, where);
  }

  @get('/contadors/{id}')
  @response(200, {
    description: 'Contador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contador, {exclude: 'where'}) filter?: FilterExcludingWhere<Contador>
  ): Promise<Contador> {
    return this.contadorRepository.findById(id, filter);
  }

  @patch('/contadors/{id}')
  @response(204, {
    description: 'Contador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contador, {partial: true}),
        },
      },
    })
    contador: Contador,
  ): Promise<void> {
    await this.contadorRepository.updateById(id, contador);
  }

  @put('/contadors/{id}')
  @response(204, {
    description: 'Contador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contador: Contador,
  ): Promise<void> {
    await this.contadorRepository.replaceById(id, contador);
  }

  @del('/contadors/{id}')
  @response(204, {
    description: 'Contador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contadorRepository.deleteById(id);
  }
}
