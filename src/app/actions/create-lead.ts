'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Insira um e-mail válido'),
  phone: z.string().min(10, 'Insira um telefone válido com DDD'),
  message: z.string().min(10, 'Conte um pouco mais sobre o seu projeto'),
});

export async function createLeadAction(data: z.infer<typeof leadSchema>) {
  try {
    // 1. Validação REAL no servidor
    const validated = leadSchema.parse(data);

    // 2. Persistência com Prisma
    // Usamos connectOrCreate no Customer baseado no Telefone (ou Email)
    await prisma.lead.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        requirement: validated.message,
      },
    });

    // 3. Revalidação e Sucesso
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.message, // Retorna a primeira mensagem de erro do Zod
      };
    }

    console.error('Erro ao salvar Lead no Prisma:', error);
    return {
      success: false,
      message:
        'Não foi possível processar sua solicitação agora. Tente novamente.',
    };
  }
}
