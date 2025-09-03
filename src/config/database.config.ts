import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLogger } from '@/config/custom.logger';
import { join } from 'path';

export const DatabaseConfigFactory = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    logging: true,
    logger:
      configService.get<string>('NODE_ENV') === 'development' ||
      configService.get<string>('NODE_ENV') === 'local'
        ? new CustomLogger()
        : undefined,
    replication: {
      master: {
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
      },
      slaves: [
        {
          host: configService.get<string>('POSTGRES_REPLICA_HOST'),
          port: configService.get<number>('POSTGRES_REPLICA_PORT'),
          username: configService.get<string>('POSTGRES_REPLICA_USERNAME'),
          password: configService.get<string>('POSTGRES_REPLICA_PASSWORD'),
          database: configService.get<string>('POSTGRES_REPLICA_DATABASE'),
        },
      ],
    },
    synchronize: true,
    entities: [
      join(
        __dirname,
        '/../../dist/modules/**/infrastructure/database/entities/*.entity.js',
      ),
    ],
  };
};

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: DatabaseConfigFactory,
    }),
  ],
})
export class DatabaseConfigModule {}
