import { Category } from '@/modules/categories/domain/category.model';

export interface CategoryRepository {
  findOneById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  save(model: Category): Promise<Category>;
  update(model: Category): Promise<Category>;
  remove(id: string): Promise<void>;
  isSlugExists(slug: string): Promise<boolean>;
}
