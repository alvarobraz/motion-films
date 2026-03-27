import { User } from '@prisma/client';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
}

export interface IHashService {
  compare(plain: string, hashed: string): Promise<boolean>;
}

export interface ITokenService {
  generate(payload: object): Promise<string>;
}
