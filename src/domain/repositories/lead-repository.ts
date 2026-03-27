import { Lead } from '@prisma/client';

export interface CreateLeadDTO {
  name: string;
  email: string;
  phone: string;
  requirement: string;
  message: string;
}

export interface ILeadRepository {
  create(data: CreateLeadDTO): Promise<void>;
  findByEmail(email: string): Promise<Lead | null>;
  findByPhone(phone: string): Promise<Lead | null>;
}
