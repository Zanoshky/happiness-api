import {DefaultCrudRepository} from '@loopback/repository';
import {Homebase, HomebaseRelations} from '../models';
import {InMemDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HomebaseRepository extends DefaultCrudRepository<
    Homebase,
    typeof Homebase.prototype.id,
    HomebaseRelations
    > {
  constructor(
      @inject('datasources.InMem') dataSource: InMemDataSource,
  ) {
    super(Homebase, dataSource);
  }
}
