import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '@/modules/users/application/command/impl/register-user.command';
import { User } from '@/modules/users/domain/user.model';
import { Inject, Logger } from '@nestjs/common';
import { REPOSITORY_TYPES } from '@/modules/users/infrastructure/database/repositories/repository.types';
import { UserRepository } from '@/modules/users/infrastructure/database/repositories/user.repository';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand, User>
{
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    const { userData } = command;

    const userModel: User = User.create(userData);

    try {
      return await this.repository.save(userModel);
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }
}