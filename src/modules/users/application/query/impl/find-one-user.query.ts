import { FindOneUserRequestInterface } from '@/modules/users/application/interfaces/find-one-user.interface';

export class FindOneUserQuery {
  constructor(
    readonly request: FindOneUserRequestInterface,
  ) {
  }
}