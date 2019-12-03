import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Homebase, HomebaseRelations, Measurement} from '../models';
import {MysqlDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {MeasurementRepository} from './measurement.repository';

export class HomebaseRepository extends DefaultCrudRepository<
  Homebase,
  typeof Homebase.prototype.id,
  HomebaseRelations
> {
  public readonly measurements: HasManyRepositoryFactory<Measurement, typeof Homebase.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('MeasurementRepository')
    protected measurementRepositoryGetter: Getter<MeasurementRepository>,
  ) {
    super(Homebase, dataSource);
    this.measurements = this.createHasManyRepositoryFactoryFor('measurements', measurementRepositoryGetter);
  }
}
