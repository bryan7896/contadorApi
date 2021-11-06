import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Contador, ContadorRelations} from '../models';

export class ContadorRepository extends DefaultCrudRepository<
  Contador,
  typeof Contador.prototype.id,
  ContadorRelations
> {
  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
  ) {
    super(Contador, dataSource);
  }
}
