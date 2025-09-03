import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryEntity } from './infrastructure/database/entities/category.entity';
import { CategoriesController } from './interface/http/controller/categories.controller';
import { CategoriesService } from './application/services/categories.service';
import { CATEGORY_REPO_TYPES } from './infrastructure/database/repositories/repository.types';
import { CategoryRepositoryImpl } from './infrastructure/database/repositories/category.repository.impl';
import { CommandHandlers } from './application/command/handlers';
import { QueryHandlers } from './application/query/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), CqrsModule],
  controllers: [CategoriesController],
  providers: [
    {
      provide: CATEGORY_REPO_TYPES.repositories.CategoryRepository,
      useClass: CategoryRepositoryImpl,
    },
    CategoriesService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class CategoriesModule {}
