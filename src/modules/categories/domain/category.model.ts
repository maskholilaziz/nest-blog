import { AggregateRoot } from '@nestjs/cqrs';
import { CategoryEntity } from '@/modules/categories/infrastructure/database/entities/category.entity';
import { v4 } from 'uuid';

/**
 * Domain Model (AggregateRoot) = representasi bisnis (bukan DB).
 * Di Laravel biasanya kamu tidak memisahkan ini, tapi DDD memisahkan agar logika bisnis bersih.
 */
export class Category extends AggregateRoot {
  private readonly _id: string;
  private _name: string;
  private _slug: string;
  private _description?: string | null;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id: string) {
    super();
    this._id = id;
  }

  // Factory untuk create entity baru dari Request (bukan dari DB)
  static create(data: { name: string; description?: string | null }): Category {
    const now = new Date();
    const model = new Category(v4());
    model._name = data.name;
    model._description = data.description ?? null;
    model._createdAt = now;
    model._updatedAt = now;
    return model;
  }

  // Mapping dari DB Entity -> Domain
  static fromEntity(e: CategoryEntity): Category {
    const m = new Category(e.id);
    m._name = e.name;
    m._slug = e.slug;
    m._description = e.description ?? null;
    m._createdAt = e.createdAt;
    m._updatedAt = e.updatedAt;
    return m;
  }

  // Mapping dari Domain -> DB Entity
  toEntity(): CategoryEntity {
    const e = new CategoryEntity();
    e.id = this._id;
    e.name = this._name;
    e.slug = this._slug;
    e.description = this._description ?? null;
    e.createdAt = this._createdAt;
    e.updatedAt = this._updatedAt;
    return e;
  }

  update(
    p: Partial<{ name: string; slug: string; description: string | null }>,
  ) {
    if (typeof p.name !== 'undefined') this._name = p.name;
    if (typeof p.slug !== 'undefined') this._slug = p.slug;
    if (typeof p.description !== 'undefined') this._description = p.description;
    this._updatedAt = new Date();
  }

  // Getter agar properti tetap encapsulated
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get slug() {
    return this._slug;
  }
  get description() {
    return this._description;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
