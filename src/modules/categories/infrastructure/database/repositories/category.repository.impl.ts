import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from '../entities/category.entity';
import { Category } from '@/modules/categories/domain/category.model';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity) private repo: Repository<CategoryEntity>,
  ) {}

  async findOneById(id: string): Promise<Category | null> {
    const e = await this.repo.findOne({ where: { id } });
    return e ? Category.fromEntity(e) : null;
  }

  async findAll(): Promise<Category[]> {
    const rows = await this.repo.find({ order: { createdAt: 'DESC' } });
    return rows.map(Category.fromEntity);
  }

  async save(model: Category): Promise<Category> {
    const saved = await this.repo.save(model.toEntity());
    return Category.fromEntity(saved);
  }

  async update(model: Category): Promise<Category> {
    const saved = await this.repo.save(model.toEntity());
    return Category.fromEntity(saved);
  }

  async remove(id: string): Promise<void> {
    // Soft delete (butuh @DeleteDateColumn di entity)
    await this.repo.softDelete(id);
  }

  async isSlugExists(slug: string): Promise<boolean> {
    const found = await this.repo.findOne({ where: { slug } });
    return !!found;
  }
}
