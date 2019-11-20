import {DefaultCrudRepository} from '@loopback/repository';
import {Role, RoleRelations} from '../models';
import {InMemDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id, RoleRelations> {
  constructor(@inject('datasources.InMem') dataSource: InMemDataSource) {
    super(Role, dataSource);
  }
}
