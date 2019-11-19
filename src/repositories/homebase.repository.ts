import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Homebase, HomebaseRelations, Measurement} from '../models';
import {InMemDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MeasurementRepository} from './measurement.repository';

export class HomebaseRepository extends DefaultCrudRepository<
    Homebase,
    typeof Homebase.prototype.id,
    HomebaseRelations
    > {

  public readonly measurements: HasManyRepositoryFactory<Measurement, typeof Homebase.prototype.id>;

  constructor(
      @inject('datasources.InMem') dataSource: InMemDataSource, @repository.getter('MeasurementRepository') protected measurementRepositoryGetter: Getter<MeasurementRepository>,
  ) {
    super(Homebase, dataSource);
    this.measurements = this.createHasManyRepositoryFactoryFor('measurements', measurementRepositoryGetter,);
  }
}
