import {
  BindingKey,
  Constructor,
  CoreBindings,
  Getter,
  inject,
  MetadataInspector,
  MethodDecoratorFactory,
  Provider,
  Setter,
  ValueOrPromise,
} from '@loopback/core';
import {
  AuthenticateFn,
  AUTHENTICATION_METADATA_KEY,
  AuthenticationBindings,
  AuthenticationMetadata,
  AuthenticationStrategy,
} from '@loopback/authentication';
import {securityId, UserProfile} from '@loopback/security';
import {StrategyAdapter} from '@loopback/authentication-passport';
import {AuthMetadataProvider} from '@loopback/authentication/dist/providers/auth-metadata.provider';
import {UserRepository, UserRoleRepository} from './repositories';
import {repository} from '@loopback/repository';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import {HttpErrors, Request} from '@loopback/rest';

export const JWT_STRATEGY_NAME = 'jwt';

export function secured(
  type: SecuredType = SecuredType.IS_AUTHENTICATED, // more on this below
  roles: string[] = [],
  strategy = 'jwt',
  options?: object,
) {
  return MethodDecoratorFactory.createDecorator<MyAuthenticationMetadata>(AUTHENTICATION_METADATA_KEY, {
    type,
    roles,
    strategy,
    options,
  });
}

export enum SecuredType {
  /**
   * Allows access to any authenticated user
   */
  IS_AUTHENTICATED,

  /**
   * Allows access to ANYONE, bypasses security check
   */
  PERMIT_ALL,

  /**
   * Allows access to user that have one or more roles specified in the `roles` attribute
   */
  HAS_ANY_ROLE,

  /**
   * Allows access to user that have all roles specified in the `roles` attribute
   */
  HAS_ROLES,

  /**
   * Denies all users, authenticated or not
   */
  DENY_ALL,
}

export interface MyAuthenticationMetadata extends AuthenticationMetadata {
  type: SecuredType;
  roles: string[];
}

export class MyAuthMetadataProvider extends AuthMetadataProvider {
  constructor(
    @inject(CoreBindings.CONTROLLER_CLASS, {optional: true})
    protected _controllerClass: Constructor<{}>,
    @inject(CoreBindings.CONTROLLER_METHOD_NAME, {optional: true})
    protected _methodName: string,
  ) {
    super(_controllerClass, _methodName);
  }

  value(): MyAuthenticationMetadata | undefined {
    if (!this._controllerClass || !this._methodName) return;
    return MetadataInspector.getMethodMetadata<MyAuthenticationMetadata>(
      AUTHENTICATION_METADATA_KEY,
      this._controllerClass.prototype,
      this._methodName,
    );
  }
}

// Secret to encrypt and decrypt JWT token
export const JWT_SECRET = 'todo-extract-to-env';

export interface Credentials {
  username: string;
  password: string;
}

export interface AuthToken {
  token: string;
  id: string;
  email: string;
  roles: Array<String>;
}

export namespace MyAuthBindings {
  export const STRATEGY = BindingKey.create<AuthenticationStrategy | undefined>('authentication.strategy');
}

export class MyAuthAuthenticationStrategyProvider implements Provider<AuthenticationStrategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: MyAuthenticationMetadata,
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
  ) {}

  value(): ValueOrPromise<AuthenticationStrategy | undefined> {
    if (!this.metadata) return;

    const {strategy} = this.metadata;
    if (strategy === JWT_STRATEGY_NAME) {
      const jwtStrategy = new JwtStrategy(
        {
          secretOrKey: JWT_SECRET,
          jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            ExtractJwt.fromUrlQueryParameter('access_token'),
          ]),
        },
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        (payload, done) => this.verifyToken(payload, done),
      );

      return new StrategyAdapter(jwtStrategy, JWT_STRATEGY_NAME);
    }
  }

  async verifyToken(
    payload: Credentials,
    done: (err: Error | null, user?: UserProfile | false, info?: Object) => void,
  ) {
    try {
      const {username} = payload;
      const user = await this.userRepository.findOne({where: {username: username}});
      if (!user) done(null, false);

      await this.verifyRoles(user!.id);

      done(null, {name: username, email: user!.email, [securityId]: username});
    } catch (err) {
      if (err.name === 'UnauthorizedError') done(null, false);
      done(err, false);
    }
  }

  async verifyRoles(userId: string) {
    const {type, roles} = this.metadata;

    if ([SecuredType.IS_AUTHENTICATED, SecuredType.PERMIT_ALL].includes(type)) return;

    if (type === SecuredType.HAS_ANY_ROLE) {
      if (!roles.length) return;
      const {count} = await this.userRoleRepository.count({
        userId: userId,
        roleId: {inq: roles},
      });

      if (count) return;
    } else if (type === SecuredType.HAS_ROLES && roles.length) {
      const userRoles = await this.userRoleRepository.find({
        where: {userId: userId},
      });
      const roleIds = userRoles.map(ur => ur.roleId);
      let valid = true;
      for (const role of roles)
        if (!roleIds.includes(role)) {
          valid = false;
          break;
        }

      if (valid) return;
    }

    throw new HttpErrors.Unauthorized('Invalid authorization');
  }
}

export class MyAuthActionProvider implements Provider<AuthenticateFn> {
  constructor(
    @inject.getter(MyAuthBindings.STRATEGY)
    readonly getStrategy: Getter<AuthenticationStrategy>,
    @inject.setter(AuthenticationBindings.CURRENT_USER)
    readonly setCurrentUser: Setter<UserProfile>,
    @inject.getter(AuthenticationBindings.METADATA)
    readonly getMetadata: Getter<MyAuthenticationMetadata>,
  ) {}

  value(): AuthenticateFn {
    return request => this.action(request);
  }

  async action(request: Request): Promise<UserProfile | undefined> {
    const metadata = await this.getMetadata();
    if (metadata && metadata.type === SecuredType.PERMIT_ALL) return;

    const strategy = await this.getStrategy();
    if (!strategy) return;

    const user = await strategy.authenticate(request);
    if (!user) return;

    this.setCurrentUser(user);
    return user;
  }
}
