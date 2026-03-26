import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  requirement: z.string().min(1, 'Selecione uma necessidade'),
  message: z.string().min(10, 'Conte-nos um pouco mais'),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;
