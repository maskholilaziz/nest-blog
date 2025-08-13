import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IsUserExistsQuery } from '@/modules/users/application/query/impl/is-user-exists.query';
import { Inject } from '@nestjs/common';
import { REPOSITORY_TYPES } from '@/modules/users/infrastructure/database/repositories/repository.types';
import { UserRepository } from '@/modules/users/infrastructure/database/repositories/user.repository';

@QueryHandler(IsUserExistsQuery)
export class IsUserExistsHandler
  implements IQueryHandler<IsUserExistsQuery, boolean>
{
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: IsUserExistsQuery): Promise<boolean> {
    return await this.userRepository.isUserExists(query.request);
  }
}