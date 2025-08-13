import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ResponseHelper } from '../helpers/response.helper';
import { MultiLanguageMessageDto } from '../dto/multi-language-message.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AUTH_MESSAGE } from '@/modules/users/constant/message.constant';

@Injectable()
export class AuthJWTGuard implements CanActivate, OnModuleInit {
  constructor(
    @Inject('AUTHENTICATION_PROTO_PACKAGE') private readonly client: ClientGrpc,
  ) {
  }

  private authenticationRpcService: any;

  onModuleInit(): any {
    this.authenticationRpcService = this.client.getService<any>('CheckAuthService');
  }

  private async checkAuth(
    request: any,
  ): Promise<any> {
    try {
      const requestData = {
        body: request.body,
        headers: request.headers,
        method: request.method,
        url: request.url,
        query: request.query,
        params: request.params,
      };
      const stringRequest = JSON.stringify(requestData);
      return await lastValueFrom(
        this.authenticationRpcService.CheckAuth({ request: stringRequest })
          .pipe((res: any) => res),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const executionType = context.getType();
    let request: any;
    if (executionType === 'rpc') {
      const ctx = context.switchToRpc().getContext();
      request = {
        headers: {
          authorization: ctx.get('authorization')[0] as string[],
        },
      };
    } else {
      request = context.switchToHttp().getRequest<Request>();
    }

    const statusVerifyJwt = await this.checkAuth(request);
    if (!statusVerifyJwt.status) {
      throw new UnauthorizedException(
        ResponseHelper.failed(
          statusVerifyJwt?.message ||
          new MultiLanguageMessageDto(
            AUTH_MESSAGE.ID.TOKEN_NOT_PROVIDED,
            AUTH_MESSAGE.ID.TOKEN_NOT_PROVIDED,
          ),
        ),
      );
    }

    const updatedResponse = JSON.parse(statusVerifyJwt?.request);
    if (executionType === 'rpc') {
      const [req] = context.getArgs();
      req['jwt'] = updatedResponse?.['jwt'];
    } else {
      request['jwt'] = updatedResponse?.['jwt'];
    }
    return true;
  }
}