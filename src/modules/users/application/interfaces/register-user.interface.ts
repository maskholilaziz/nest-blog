export interface RegisterUserInterface {
  name: string;
  idType: string;
  idNumber: string;
  preferredUsername?: string;
  email?: string;
  phoneNumber?: string;
  birthdate?: Date;
  address?: string;
}