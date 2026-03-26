'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteLeadAction(id: string) {
  try {
    await prisma.lead.delete({ where: { id } });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Erro ao excluir lead' };
  }
}

export async function updateLeadStatusAction(
  id: string,
  status: 'PENDING' | 'CONTACTED' | 'ARCHIVED'
) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Erro ao atualizar status' };
  }
}
