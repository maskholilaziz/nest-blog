import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUsersRequestDto, FindUsersResponseDto } from '@/modules/users/interface/grpc/dto/find-users.dto';
import { User } from '@/modules/users/domain/user.model';
import { UserResponseDto } from '@/modules/users/interface/grpc/dto/user-response.dto';
import { FindOneUserQuery } from '@/modules/users/application/query/impl/find-one-user.query';

@Injectable()
export class UsersRpcService {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async findUsers(request: FindUsersRequestDto): Promise<FindUsersResponseDto> {
    const user = await this.queryBus.execute(new FindOneUserQuery(request));
    const response = new FindUsersResponseDto();
    response.user = this.mapToRpcResponse(user) ;
    return response;
  }

  private mapToRpcResponse(users: User): UserResponseDto {
    return {
      id: users.id,
      idNumber: users.idNumber,
      idType: users.idType,
      name: users.name,
      nickname: users.nickname,
      preferredUsername: users.preferredUsername,
      picture: users.picture,
      email: users.email,
      emailVerified: users.emailVerified,
      gender: users.gender,
      birthdate: users.birthdate.toString(),
      phoneNumber: users.phoneNumber,
      phoneNumberVerified: users.phoneNumberVerified,
      address: users.address,
      placeOfBirth: users.placeOfBirth,
      nationalities: users.nationalities,
      postalCode: users.postalCode,
      city: users.city,
      createdAt: users.createdAt.toString(),
      updatedAt: users.updatedAt.toString(),
      status: JSON.stringify(users.status),
    };
  }
}