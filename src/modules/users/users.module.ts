import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { REPOSITORY_TYPES } from '@/modules/users/infrastructure/database/repositories/repository.types';
import { UserRepositoryImpl } from '@/modules/users/infrastructure/database/repositories/user.repository.impl';
import { CommandHandlers } from '@/modules/users/application/command/handlers';
import { QueryHandlers } from '@/modules/users/application/query/handlers';
import { UsersService } from '@/modules/users/application/services/users.service';
import { UsersController } from '@/modules/users/interface/http/controller/users.controller';
import { UserEntity } from '@/modules/users/infrastructure/database/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersRpcService } from '@/modules/users/application/services/users-rpc.service';
import { UsersRpcController } from '@/modules/users/interface/grpc/controller/users-rpc.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    HttpModule,
    CqrsModule,
    // ClientsModule.registerAsync(([
    //   {
    //     name: 'AUTHENTICATION_PROTO_PACKAGE',
    //     inject: [ConfigService],
    //     useFactory: async (
    //       configService: ConfigService,
    //     ): Promise<ClientProvider> => {
    //       return {
    //         transport: Transport.GRPC,
    //         options: {
    //           url: configService.get<string>('AUTH_SERVICE_GRPC_URL'),
    //           package: ['auth'],
    //           protoPath: [join(__dirname, '../../proto/auth/auth.proto')],
    //           channelOptions: {
    //             interceptors:
    //               configService.get<string>('NODE_ENV') === 'local'
    //                 ? grpcPathInterceptor('/sso-auth')
    //                 : undefined,
    //           },
    //         },
    //       };
    //     },
    //   },
    //   {
    //     name: 'CREDENTIAL_PROTO_PACKAGE',
    //     inject: [ConfigService],
    //     useFactory: async (
    //       configService: ConfigService,
    //     ): Promise<ClientProvider> => {
    //       return {
    //         transport: Transport.GRPC,
    //         options: {
    //           url: configService.get<string>('CREDENTIAL_SERVICE_GRPC_URL'),
    //           package: [
    //             'password',
    //           ],
    //           protoPath: [
    //             join(__dirname, '../../proto/credential/password.proto'),
    //           ],
    //           channelOptions: {
    //             interceptors:
    //               configService.get<string>('NODE_ENV') === 'local'
    //                 ? grpcPathInterceptor('/sso-credential')
    //                 : undefined,
    //           },
    //         },
    //       };
    //     },
    //   },
    // ]))
  ],
  providers: [
    {
      provide: REPOSITORY_TYPES.repositories.UserRepository,
      useClass: UserRepositoryImpl,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    UsersService,
    UsersRpcService,
  ],
  controllers: [UsersController, UsersRpcController],
  exports: [],
})
export class UsersModule {}