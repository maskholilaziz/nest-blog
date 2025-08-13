import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from '@/modules/users/application/services/users.service';
import { RegisterUserRequestDto, RegisterUserResponseDto } from '@/modules/users/interface/http/dto/register-user.dto';
import { ResponseDto } from '@/common/dto/response.dto';
import { FindOneUserRequestDto, FindOneUserResponseDto } from '@/modules/users/interface/http/dto/find-one-user.dto';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  async registerUser(
    @Body() request: RegisterUserRequestDto,
  ): Promise<ResponseDto<RegisterUserResponseDto>> {
    return await this.usersService.registerUser(request);
  }

  @Get('detail')
  async findUser(
    @Query() query: FindOneUserRequestDto
  ): Promise<ResponseDto<FindOneUserResponseDto>> {
    return await this.usersService.findUser(query);
  }
}