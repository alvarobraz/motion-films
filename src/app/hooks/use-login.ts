'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginSchema, LoginInput } from '@/lib/schemas';
import { loginAction } from '@/app/actions/login-action';

export function useLogin() {
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    const result = await loginAction(data);

    if (result.success) {
      toast.success('Acesso autorizado!', {
        description: 'Bem-vindo de volta, produtor.',
      });

      router.push('/dashboard');
      router.refresh();
    } else {
      toast.error('Erro de autenticação', {
        description: result.message,
      });
    }
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
}
