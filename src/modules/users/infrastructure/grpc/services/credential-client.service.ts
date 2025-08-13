import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { CredentialClientInterface } from './credential-client.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { CreatePasswordRequestDto } from '../dto/create-password.dto';
import { ResponseDto } from '../../../../../common/dto/response.dto';
import { lastValueFrom, map } from 'rxjs';

export class CredentialClientService implements OnModuleInit {
  private credentialClient: CredentialClientInterface;

  constructor(
    @Inject('CREDENTIAL_PROTO_PACKAGE')
    private client: ClientGrpc,
  ) {
  }

  onModuleInit() {
    this.credentialClient = this.client.getService<CredentialClientInterface>('PasswordService');
  }

  async createPassword(
    request: CreatePasswordRequestDto,
  ): Promise<ResponseDto<any>> {
    try {
      const savedPassword = this.credentialClient.CreatePassword(request);
      return await lastValueFrom(
        savedPassword.pipe(
          map((res) => (res)),
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }
}