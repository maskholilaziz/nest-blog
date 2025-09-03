import { Tag } from '@/modules/tags/domain/tag.model';

export interface TagRepository {
  findOneById(id: string): Promise<Tag | null>;
  findAll(): Promise<Tag[]>;
  save(model: Tag): Promise<Tag>;
  update(model: Tag): Promise<Tag>;
  remove(id: string): Promise<void>;
  isSlugExists(slug: string): Promise<boolean>;
}
