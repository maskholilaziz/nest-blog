import { RegisterUserInterface } from '@/modules/users/application/interfaces/register-user.interface';

export class RegisterUserCommand {
  constructor(
    readonly  userData: RegisterUserInterface
  ) {
  }
}