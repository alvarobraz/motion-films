import { Lead, LeadStatus } from '@prisma/client';

export interface CreateLeadDTO {
  name: string;
  email: string;
  phone: string;
  requirement: string;
  message: string;
}

export interface DashboardStats {
  leads: Lead[];
  chartData: { date: string; count: number }[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ILeadRepository {
  create(data: CreateLeadDTO): Promise<void>;
  findByEmail(email: string): Promise<Lead | null>;
  findByPhone(phone: string): Promise<Lead | null>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, status: LeadStatus): Promise<void>;
  findById(id: string): Promise<Lead | null>;
  findManyWithPagination(
    skip: number,
    take: number,
    query?: string
  ): Promise<{ leads: Lead[]; total: number }>;
  findAllCreatedAt(): Promise<{ createdAt: Date }[]>;
}
export { LeadStatus };
