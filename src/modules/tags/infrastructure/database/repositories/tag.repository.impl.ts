import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagRepository } from './tag.repository';
import { TagEntity } from '../entities/tag.entity';
import { Tag } from '@/modules/tags/domain/tag.model';

@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(
    @InjectRepository(TagEntity) private repo: Repository<TagEntity>,
  ) {}

  async findOneById(id: string): Promise<Tag | null> {
    const e = await this.repo.findOne({ where: { id } });
    return e ? Tag.fromEntity(e) : null;
  }

  async findAll(): Promise<Tag[]> {
    const rows = await this.repo.find({ order: { createdAt: 'DESC' } });
    return rows.map(Tag.fromEntity);
  }

  async save(model: Tag): Promise<Tag> {
    const saved = await this.repo.save(model.toEntity());
    return Tag.fromEntity(saved);
  }

  async update(model: Tag): Promise<Tag> {
    const saved = await this.repo.save(model.toEntity());
    return Tag.fromEntity(saved);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async isSlugExists(slug: string): Promise<boolean> {
    const found = await this.repo.findOne({ where: { slug } });
    return !!found;
  }
}
