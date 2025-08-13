import { IsUserExistsInterface } from '@/modules/users/application/interfaces/is-user-exists.interface';

export class IsUserExistsQuery {
  constructor(
    readonly request: IsUserExistsInterface,
  ) {
  }
}