import { Controller, Logger } from '@nestjs/common';
import { UsersRpcService } from '@/modules/users/application/services/users-rpc.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { FindUsersRequestDto, FindUsersResponseDto } from '@/modules/users/interface/grpc/dto/find-users.dto';

@Controller()
export class UsersRpcController {
  constructor(
    private readonly usersRpcService: UsersRpcService,
  ) { }

  @GrpcMethod('UserService', 'FindUsers')
  async findUsers(request: FindUsersRequestDto): Promise<FindUsersResponseDto> {
    Logger.log('Inside findUsers method...', 'UserRPC');

    // Validasi parameter
    if (!request.id && !request.idNumber && !request.email && !request.phoneNumber) {
      throw new RpcException({
        code: 3, // INVALID_ARGUMENT (standard gRPC code)
        message: 'Id or idNumber or email or phone number filter must be provided',
      });
    }

    return await this.usersRpcService.findUsers(request);
  }
}