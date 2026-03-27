// src/infra/repositories/prisma-lead-repository.ts
import { prisma } from '@/lib/prisma';
import {
  ILeadRepository,
  CreateLeadDTO,
  LeadStatus,
} from '@/domain/repositories/lead-repository';

export class PrismaLeadRepository implements ILeadRepository {
  async findByEmail(email: string) {
    return await prisma.lead.findFirst({
      where: { customer: { email } },
    });
  }

  async findByPhone(phone: string) {
    return await prisma.lead.findFirst({
      where: { customer: { phone } },
    });
  }

  async create(data: CreateLeadDTO): Promise<void> {
    await prisma.lead.create({
      data: {
        requirement: data.requirement,
        message: data.message,
        status: 'PENDING',
        customer: {
          connectOrCreate: {
            where: { email: data.email },
            create: {
              name: data.name,
              email: data.email,
              phone: data.phone,
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await prisma.lead.findUnique({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await prisma.lead.delete({ where: { id } });
  }

  async updateStatus(id: string, status: LeadStatus): Promise<void> {
    await prisma.lead.update({
      where: { id },
      data: { status },
    });
  }
}
