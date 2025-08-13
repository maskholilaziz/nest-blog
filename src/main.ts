import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const SERVICE_PREFIX = configService.get<string>('SERVICE_PREFIX');
  app.setGlobalPrefix(SERVICE_PREFIX);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });
  app.set('trust proxy', true);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const PORT = configService.get<string>('PORT');
  await app.listen(PORT, '0.0.0.0');

  const GRPC_URL = configService.get<string>('GRPC_URL');
  const grpc = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: [
          'user',
        ],
        protoPath: [
          join(__dirname, './proto/user/user.proto'),
        ],
        url: GRPC_URL,
      },
    },
  );

  await grpc.listen();
}
bootstrap();
