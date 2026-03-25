'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  requirement: z.string().min(1, 'Selecione uma necessidade'),
  message: z.string().min(10, 'Conte um pouco mais sobre o projeto'),
});

export async function createLeadAction(data: z.infer<typeof leadSchema>) {
  console.log('Dados recebidos na Action:', data);
  try {
    const validated = leadSchema.parse(data);

    await prisma.lead.create({
      data: {
        requirement: validated.requirement,
        message: validated.message,
        customer: {
          connectOrCreate: {
            where: { email: validated.email },
            create: {
              name: validated.name,
              email: validated.email,
              phone: validated.phone,
            },
          },
        },
      },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.log('Error:', error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.message,
      };
    }

    console.error('Erro ao salvar no Banco:', error);
    return {
      success: false,
      message: 'Erro interno ao processar seu contato. Tente novamente.',
    };
  }
}
