import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PostRepository } from './post.repository';
import { PostEntity } from '../entities/post.entity';
import { CategoryEntity } from '@/modules/categories/infrastructure/database/entities/category.entity';
import { TagEntity } from '@/modules/tags/infrastructure/database/entities/tag.entity';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @InjectRepository(PostEntity) private repo: Repository<PostEntity>,
    @InjectRepository(CategoryEntity)
    private catRepo: Repository<CategoryEntity>,
    @InjectRepository(TagEntity) private tagRepo: Repository<TagEntity>,
  ) {}

  async findOneById(
    id: string,
    withRelations = true,
  ): Promise<PostEntity | null> {
    const qb = this.repo.createQueryBuilder('post');
    if (withRelations) {
      qb.leftJoinAndSelect('post.category', 'category').leftJoinAndSelect(
        'post.tags',
        'tags',
      );
    }
    qb.where('post.id = :id', { id });
    return qb.getOne();
  }

  async findAll(withRelations = true): Promise<PostEntity[]> {
    const qb = this.repo.createQueryBuilder('post');
    if (withRelations) {
      qb.leftJoinAndSelect('post.category', 'category').leftJoinAndSelect(
        'post.tags',
        'tags',
      );
    }
    qb.orderBy('post.created_at', 'DESC'); // gunakan snake_case sesuai entity
    return qb.getMany();
  }

  async save(entity: PostEntity): Promise<PostEntity> {
    return this.repo.save(entity);
  }

  async update(entity: PostEntity): Promise<PostEntity> {
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softDelete(id); // soft delete (butuh @DeleteDateColumn)
  }

  async isSlugExists(slug: string): Promise<boolean> {
    const found = await this.repo.findOne({ where: { slug } });
    return !!found;
  }

  // Helpers buat handler
  async findCategoryById(id: string): Promise<CategoryEntity | null> {
    return this.catRepo.findOne({ where: { id } });
  }

  async findTagsByIds(ids: string[]): Promise<TagEntity[]> {
    if (!ids?.length) return [];
    return this.tagRepo.find({ where: { id: In(ids) } });
  }
}
