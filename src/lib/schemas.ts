import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Insira um e-mail válido'),
  phone: z.string().min(10, 'Insira um telefone válido com DDD'),
  message: z.string().min(10, 'Conte um pouco mais sobre o seu projeto'),
});

export type LeadInput = z.infer<typeof leadSchema>;
