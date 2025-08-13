import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@/modules/users/infrastructure/database/entities/user.entity';
import { v4 } from 'uuid';
import { RegisterUserInterface } from '@/modules/users/application/interfaces/register-user.interface';

export class User extends AggregateRoot {
  private readonly _id: string;
  private _idNumber: string;
  private _idType: string;
  private _name: string;
  private _nickname: string;
  private _preferredUsername: string;
  private _picture: string;
  private _email: string;
  private _emailVerified: string;
  private _gender: string;
  private _birthdate: Date;
  private _phoneNumber: string;
  private _phoneNumberVerified: string;
  private _address: string;
  private _placeOfBirth: string;
  private _nationalities: string;
  private _postalCode: string;
  private _city: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _status: Record<string, any>;

  constructor(id: string) {
    super();
    this._id = id;
  }

  public static create(userData: RegisterUserInterface): User {
    const id = v4();
    const now = new Date();

    const user = new User(id);
    user._idNumber = userData.idNumber;
    user._idType = userData.idType;
    user._name = userData.name;
    user._email = userData?.email;
    user._birthdate = userData?.birthdate;
    user._preferredUsername = userData?.idNumber;
    user._phoneNumber = userData?.phoneNumber;
    user._address = userData?.address || '';
    user._status = {
      active: true,
      deleted: false,
    };
    user._createdAt = now;
    user._updatedAt = now;
    return user;
  }

  public static fromEntity(entity: UserEntity): User {
    const user = new User(entity.id);
    user._idNumber = entity.idNumber;
    user._idType = entity.idType;
    user._name = entity.name;
    user._nickname = entity.nickname;
    user._preferredUsername = entity.preferredUsername;
    user._picture = entity.picture;
    user._email = entity.email;
    user._emailVerified = entity.emailVerified;
    user._gender = entity.gender;
    user._birthdate = entity.birthdate;
    user._phoneNumber = entity.phoneNumber;
    user._phoneNumberVerified = entity.phoneNumberVerified;
    user._address = entity.address;
    user._placeOfBirth = entity.placeOfBirth;
    user._nationalities = entity.nationalities;
    user._postalCode = entity.postalCode;
    user._city = entity.city;
    user._createdAt = entity.createdAt;
    user._updatedAt = entity.updatedAt;
    user._status = entity.status;
    return user;
  }

  toEntity(): UserEntity {
    const entity = new UserEntity();
    entity.id = this._id;
    entity.idNumber = this._idNumber;
    entity.idType = this._idType;
    entity.name = this._name;
    entity.nickname = this._nickname;
    entity.preferredUsername = this._preferredUsername;
    entity.picture = this._picture;
    entity.email = this._email;
    entity.emailVerified = this._emailVerified;
    entity.gender = this._gender;
    entity.birthdate = this._birthdate;
    entity.phoneNumber = this._phoneNumber || '';
    entity.phoneNumberVerified = this._phoneNumberVerified;
    entity.address = this._address || '';
    entity.placeOfBirth = this._placeOfBirth;
    entity.nationalities = this._nationalities;
    entity.postalCode = this._postalCode;
    entity.city = this._city;
    entity.createdAt = this._createdAt;
    entity.updatedAt = this._updatedAt;
    entity.status = this._status;

    return entity;
  }

  public updateUser(updateData: Partial<User>) {
    Object.assign(this, updateData);
    this._updatedAt = new Date();
  }

  /**
   * Getter function
   */
  get id(): string {
    return this._id;
  }

  get idNumber(): string {
    return this._idNumber;
  }

  get idType(): string {
    return this._idType;
  }

  get name(): string {
    return this._name;
  }

  get nickname(): string {
    return this._nickname;
  }

  get preferredUsername(): string {
    return this._preferredUsername;
  }

  get picture(): string {
    return this._picture;
  }

  get email(): string {
    return this._email;
  }

  get emailVerified(): string {
    return this._emailVerified;
  }

  get gender(): string {
    return this._gender;
  }

  get birthdate(): Date {
    return this._birthdate;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get phoneNumberVerified(): string {
    return this._phoneNumberVerified;
  }

  get address(): string {
    return this._address;
  }

  get placeOfBirth(): string {
    return this._placeOfBirth;
  }

  get nationalities(): string {
    return this._nationalities;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  get city(): string {
    return this._city;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get status(): Record<string, any> {
    return this._status;
  }

  /**
   * Setter function
   */
  set idNumber(value: string) {
    this._idNumber = value;
  }

  set idType(value: string) {
    this._idType = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set nickname(value: string) {
    this._nickname = value;
  }

  set preferredUsername(value: string) {
    this._preferredUsername = value;
  }

  set picture(value: string) {
    this._picture = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set emailVerified(value: string) {
    this._emailVerified = value;
  }

  set gender(value: string) {
    this._gender = value;
  }

  set birthdate(value: Date) {
    this._birthdate = value;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  set phoneNumberVerified(value: string) {
    this._phoneNumberVerified = value;
  }

  set address(value: string) {
    this._address = value;
  }

  set placeOfBirth(value: string) {
    this._placeOfBirth = value;
  }

  set nationalities(value: string) {
    this._nationalities = value;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  set city(value: string) {
    this._city = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  set status(value: Record<string, any>) {
    this._status = value;
  }
}