import {DefaultCrudRepository} from '@loopback/repository';
import {UserRole, UserRoleRelations} from '../models';
import {InMemDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRoleRepository extends DefaultCrudRepository<
  UserRole,
  typeof UserRole.prototype.id,
  UserRoleRelations
> {
  constructor(@inject('datasources.InMem') dataSource: InMemDataSource) {
    super(UserRole, dataSource);
  }
}
