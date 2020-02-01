import {HttpErrors, post, requestBody, getModelSchemaRef} from '@loopback/rest';
import {User} from '../models';
import {UserRepository, UserRoleRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Credentials, JWT_SECRET, secured, SecuredType} from '../auth';
import {promisify} from 'util';

const {sign} = require('jsonwebtoken');
const signAsync = promisify(sign);

export class UserController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
  ) {}

  @secured(SecuredType.PERMIT_ALL)
  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async createUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: User,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @secured(SecuredType.PERMIT_ALL)
  @post('/users/login', {
    responses: {
      '200': {
        description: 'AuthToken instance',
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {},
      },
    })
    credentials: Credentials,
  ) {
    if (!credentials.username || !credentials.password) throw new HttpErrors.BadRequest('Missing Username or Password');
    const user = await this.userRepository.findOne({
      where: {username: credentials.username},
    });
    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');

    const isPasswordMatched = user.password === credentials.password;
    if (!isPasswordMatched) throw new HttpErrors.Unauthorized('Invalid credentials');

    const tokenObject = {username: credentials.username};
    const token = await signAsync(tokenObject, JWT_SECRET);
    const roles = await this.userRoleRepository.find({
      where: {userId: user.id},
    });
    const {id, email} = user;

    return {
      token,
      id: id as string,
      email,
      roles: roles.map(r => r.roleId),
    };
  }
}
