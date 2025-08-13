import { FindOneUserHandler } from '@/modules/users/application/query/handlers/find-one-user.handler';
import { IsUserExistsHandler } from '@/modules/users/application/query/handlers/is-user-exists.handler';

export const QueryHandlers = [
  FindOneUserHandler,
  IsUserExistsHandler,
]