'use server';

import { CreateLeadUseCase } from '@/application/use-cases/create-lead-use-case';
import { PrismaLeadRepository } from '@/infra/repositories/prisma-lead-repository';
import { leadSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

const leadRepository = new PrismaLeadRepository();
const createLeadUseCase = new CreateLeadUseCase(leadRepository);

export async function createLeadAction(data: unknown) {
  try {
    const validated = leadSchema.parse(data);

    await createLeadUseCase.execute(validated);

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Erro ao processar lead.' };
  }
}
