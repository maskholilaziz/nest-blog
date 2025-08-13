import { UserResponseDto } from '@/modules/users/interface/grpc/dto/user-response.dto';

export class FindUsersRequestDto {
  id?: string;
  idNumber?: string;
  phoneNumber?: string;
  email?: string;
}

export class FindUsersResponseDto {
  user: UserResponseDto;
}