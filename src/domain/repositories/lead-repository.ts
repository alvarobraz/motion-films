import { Lead, LeadStatus } from '@prisma/client';

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
  delete(id: string): Promise<void>;
  updateStatus(id: string, status: LeadStatus): Promise<void>;
  findById(id: string): Promise<Lead | null>;
}
export { LeadStatus };
