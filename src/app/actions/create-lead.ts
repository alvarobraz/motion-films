'use server';

import { prisma } from '@/lib/prisma';
import { leadSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createLeadAction(data: z.infer<typeof leadSchema>) {
  try {
    const validated = leadSchema.parse(data);

    await prisma.lead.create({
      data: {
        requirement: validated.requirement,
        message: validated.message,
        status: 'PENDING',
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
