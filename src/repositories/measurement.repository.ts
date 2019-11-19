import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Measurement, MeasurementRelations, Homebase} from '../models';
import {InMemDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {HomebaseRepository} from './homebase.repository';

export class MeasurementRepository extends DefaultCrudRepository<
    Measurement,
    typeof Measurement.prototype.id,
    MeasurementRelations
    > {

  public readonly homebase: BelongsToAccessor<Homebase, typeof Measurement.prototype.id>;

  constructor(
      @inject('datasources.InMem') dataSource: InMemDataSource, @repository.getter('HomebaseRepository') protected homebaseRepositoryGetter: Getter<HomebaseRepository>,
  ) {
    super(Measurement, dataSource);
    this.homebase = this.createBelongsToAccessorFor('homebase', homebaseRepositoryGetter,);
  }
}
