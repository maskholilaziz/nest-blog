import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { PostEntity } from './infrastructure/database/entities/post.entity';
import { CategoryEntity } from '@/modules/categories/infrastructure/database/entities/category.entity';
import { TagEntity } from '@/modules/tags/infrastructure/database/entities/tag.entity';

import { PostsController } from './interface/http/controller/posts.controller';
import { PostsService } from './application/services/posts.service';

import { PostRepositoryImpl } from './infrastructure/database/repositories/post.repository.impl';

import { CommandHandlers } from './application/command/handlers';
import { QueryHandlers } from './application/query/handlers';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CategoryEntity, TagEntity]),
    CqrsModule,
  ],
  controllers: [PostsController],
  providers: [
    PostRepositoryImpl,
    PostsService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class PostsModule {}
