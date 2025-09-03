import { AggregateRoot } from '@nestjs/cqrs';
import { TagEntity } from '@/modules/tags/infrastructure/database/entities/tag.entity';
import { v4 } from 'uuid';

export class Tag extends AggregateRoot {
  private readonly _id: string;
  private _name: string;
  private _slug: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id: string) {
    super();
    this._id = id;
  }

  static create(d: { name: string }): Tag {
    const now = new Date();
    const m = new Tag(v4());
    m._name = d.name;
    m._createdAt = now;
    m._updatedAt = now;
    return m;
  }

  static fromEntity(e: TagEntity): Tag {
    const m = new Tag(e.id);
    m._name = e.name;
    m._slug = e.slug;
    m._createdAt = e.createdAt;
    m._updatedAt = e.updatedAt;
    return m;
  }

  toEntity(): TagEntity {
    const e = new TagEntity();
    e.id = this._id;
    e.name = this._name;
    e.slug = this._slug;
    e.createdAt = this._createdAt;
    e.updatedAt = this._updatedAt;
    return e;
  }

  update(p: Partial<{ name: string; slug: string }>) {
    if (typeof p.name !== 'undefined') this._name = p.name;
    if (typeof p.slug !== 'undefined') this._slug = p.slug;
    this._updatedAt = new Date();
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get slug() {
    return this._slug;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
