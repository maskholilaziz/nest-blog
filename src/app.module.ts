import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  EnvValidationOptions,
  EnvValidationSchema,
} from './config/env-validation.config';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseConfigModule } from '@/config/database.config';
import { UsersModule } from '@/modules/users/users.module';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { TagsModule } from '@/modules/tags/tags.module';
import { PostsModule } from '@/modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
      validationOptions: EnvValidationOptions,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`, '.env'],
    }),
    CqrsModule,
    DatabaseConfigModule,
    UsersModule,
    CategoriesModule,
    TagsModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
