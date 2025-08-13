import { User } from '@/modules/users/domain/user.model';
import { FindOneUserRequestInterface } from '@/modules/users/application/interfaces/find-one-user.interface';
import { IsUserExistsInterface } from '@/modules/users/application/interfaces/is-user-exists.interface';

export interface UserRepository {
  findOne(query: FindOneUserRequestInterface): Promise<User>;

  save(user: User): Promise<User>;

  isUserExists(query: IsUserExistsInterface): Promise<boolean>;
}