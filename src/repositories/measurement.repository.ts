import {DefaultCrudRepository} from '@loopback/repository';
import {Measurement, MeasurementRelations} from '../models';
import {InMemDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MeasurementRepository extends DefaultCrudRepository<
  Measurement,
  typeof Measurement.prototype.id,
  MeasurementRelations
> {
  constructor(
    @inject('datasources.InMem') dataSource: InMemDataSource,
  ) {
    super(Measurement, dataSource);
  }
}
