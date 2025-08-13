import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/users/infrastructure/database/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/infrastructure/database/entities/user.entity';
import { Repository } from 'typeorm';
import { FindOneUserRequestInterface } from '@/modules/users/application/interfaces/find-one-user.interface';
import { User } from '@/modules/users/domain/user.model';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    readonly repository: Repository<UserEntity>
  ) {
  }

  async findOne(query: FindOneUserRequestInterface): Promise<User> {
    const queryBuilder = this.repository.createQueryBuilder('users');

    if (query?.id) {
      queryBuilder.andWhere('users.id = :id', { id: query.id });
    }

    if (query?.idNumber) {
      queryBuilder.andWhere('users.id_number = :idNumber', {
        idNumber: query.idNumber,
      });
    }

    if (query?.email) {
      queryBuilder.andWhere('users.email = :email', { email: query.email });
    }

    if (query?.phoneNumber) {
      queryBuilder.andWhere('users.phone_number = :phoneNumber', { phoneNumber: query.phoneNumber });
    }

    const entity = await  queryBuilder.getOne();
    if (!entity) return null;

    return  User.fromEntity(entity);
  }

  async save(user: User): Promise<User> {
    const userEntity = user.toEntity();
    const savedUser = await this.repository.save(userEntity);

    return User.fromEntity(savedUser);
  }

  async isUserExists(query: FindOneUserRequestInterface): Promise<boolean> {
    const queryBuilder = this.repository.createQueryBuilder('users');
    queryBuilder
      .orWhere(
        'users.id_number = :idNumber', { idNumber: query.idNumber }
      )
      .orWhere(
        'users.phone_number = :phoneNumber', { phoneNumber: query.phoneNumber }
      )
      .orWhere(
        'users.email = :email', { email: query.email }
      )

    const entity = await queryBuilder.getOne();
    return !!entity;
  }
}