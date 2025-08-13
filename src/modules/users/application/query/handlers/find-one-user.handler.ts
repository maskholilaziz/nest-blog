import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneUserQuery } from '@/modules/users/application/query/impl/find-one-user.query';
import { User } from '@/modules/users/domain/user.model';
import { Inject } from '@nestjs/common';
import { REPOSITORY_TYPES } from '@/modules/users/infrastructure/database/repositories/repository.types';
import { UserRepository } from '@/modules/users/infrastructure/database/repositories/user.repository';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery, User> {
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.UserRepository)
    private readonly userRepository: UserRepository,
  ) {
  }

  async execute(query: FindOneUserQuery): Promise<User> {
    return await this.userRepository.findOne(query.request);
  }
}