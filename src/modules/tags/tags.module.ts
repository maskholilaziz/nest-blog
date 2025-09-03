import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TagEntity } from './infrastructure/database/entities/tag.entity';
import { TagsController } from './interface/http/controller/tags.controller';
import { TagsService } from './application/services/tags.service';
import { TAG_REPO_TYPES } from './infrastructure/database/repositories/repository.types';
import { TagRepositoryImpl } from './infrastructure/database/repositories/tag.repository.impl';
import { CommandHandlers } from './application/command/handlers';
import { QueryHandlers } from './application/query/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), CqrsModule],
  controllers: [TagsController],
  providers: [
    {
      provide: TAG_REPO_TYPES.repositories.TagRepository,
      useClass: TagRepositoryImpl,
    },
    TagsService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class TagsModule {}
