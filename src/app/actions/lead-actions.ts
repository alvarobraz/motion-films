/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from 'next/cache';
import { PrismaLeadRepository } from '@/infra/repositories/prisma-lead-repository';
import { DeleteLeadUseCase } from '@/application/use-cases/delete-lead-use-case';
import { UpdateLeadStatusUseCase } from '@/application/use-cases/update-lead-status-use-case';
import { LeadStatus } from '@/domain/repositories/lead-repository';

const leadRepository = new PrismaLeadRepository();
const deleteLeadUseCase = new DeleteLeadUseCase(leadRepository);
const updateLeadStatusUseCase = new UpdateLeadStatusUseCase(leadRepository);

export async function deleteLeadAction(id: string) {
  try {
    await deleteLeadUseCase.execute(id);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || 'Erro ao excluir lead' };
  }
}

export async function updateLeadStatusAction(id: string, status: LeadStatus) {
  try {
    await updateLeadStatusUseCase.execute(id, status);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Erro ao atualizar status',
    };
  }
}
