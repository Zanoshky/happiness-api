import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository';
import { Homebase, Measurement, MeasurementRelations } from '../models';
import { MysqlDataSource } from '../datasources';
import { Getter, inject } from '@loopback/core';
import { HomebaseRepository } from './homebase.repository';

export class MeasurementRepository extends DefaultCrudRepository<
  Measurement,
  typeof Measurement.prototype.id,
  MeasurementRelations
  > {
  public readonly homebase: BelongsToAccessor<Homebase, typeof Measurement.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('HomebaseRepository')
    protected homebaseRepositoryGetter: Getter<HomebaseRepository>,
  ) {
    super(Measurement, dataSource);
    this.homebase = this.createBelongsToAccessorFor('homebase', homebaseRepositoryGetter);
  }
}
