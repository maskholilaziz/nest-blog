import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserRequestDto, RegisterUserResponseDto } from '@/modules/users/interface/http/dto/register-user.dto';
import { ResponseDto } from '@/common/dto/response.dto';
import { IsUserExistsQuery } from '@/modules/users/application/query/impl/is-user-exists.query';
import { ResponseHelper } from '@/common/helpers/response.helper';
import { MultiLanguageMessageDto } from '@/common/dto/multi-language-message.dto';
import { USER_MESSAGE } from '@/modules/users/constant/message.constant';
import { User } from '@/modules/users/domain/user.model';
import { RegisterUserCommand } from '@/modules/users/application/command/impl/register-user.command';
import { FindOneUserRequestDto, FindOneUserResponseDto } from '@/modules/users/interface/http/dto/find-one-user.dto';
import { FindOneUserQuery } from '@/modules/users/application/query/impl/find-one-user.query';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  private transformUserResponse(user: any) {
    return {
      userId: user.id,
      idNumber: user.idNumber,
      idType: user.idType,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthdate: user.birthdate,
    };
  }

  async registerUser(request: RegisterUserRequestDto): Promise<ResponseDto<RegisterUserResponseDto>> {
    const {
      idNumber,
      phoneNumber,
      email,
    } = request;

    try {
      const isUserExists: boolean = await this.queryBus.execute(
        new IsUserExistsQuery({
          idNumber: idNumber,
          email: email,
          phoneNumber: phoneNumber
        })
      );
      if (isUserExists) {
        throw new BadRequestException(ResponseHelper.failed((
          new MultiLanguageMessageDto(
            USER_MESSAGE.ID.FAILED_TO_REGISTER_USER,
            USER_MESSAGE.EN.FAILED_TO_REGISTER_USER,
          )
        )))
      }

      const savedUser: User = await  this.commandBus.execute(
        new RegisterUserCommand(request)
      );
      if (!savedUser) {
        throw new InternalServerErrorException(
          new MultiLanguageMessageDto(
            USER_MESSAGE.ID.FAILED_TO_REGISTER_USER,
            USER_MESSAGE.EN.FAILED_TO_REGISTER_USER,
          ),
        );
      }

      const userData = this.transformUserResponse(savedUser);
      return ResponseHelper.success(
        new MultiLanguageMessageDto(
          USER_MESSAGE.ID.SUCCESSFULLY_TO_REGISTER_USER,
          USER_MESSAGE.EN.SUCCESSFULLY_TO_REGISTER_USER,
        ),
        userData,
      )
    } catch (e) {
      Logger.error(`Error: ${e.message}`, 'UserRegistration');
      throw e;
    }
  }

  async findUser(request: FindOneUserRequestDto): Promise<ResponseDto<FindOneUserResponseDto>> {
    const user = await this.queryBus.execute(
      new FindOneUserQuery(request)
    );

    const userData = this.transformUserResponse(user);

    return ResponseHelper.success(
      new MultiLanguageMessageDto(
        USER_MESSAGE.ID.USER_FOUND,
        USER_MESSAGE.EN.USER_FOUND,
      ),
      userData,
    )
  }
}