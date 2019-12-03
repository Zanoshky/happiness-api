import { DefaultCrudRepository } from '@loopback/repository';
import { Role, RoleRelations } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id, RoleRelations> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(Role, dataSource);
  }
}
