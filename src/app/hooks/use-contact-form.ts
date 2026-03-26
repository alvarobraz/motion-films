'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { leadSchema, LeadInput } from '@/lib/schemas';
import { createLeadAction } from '@/app/actions/create-lead';

export function useContactForm() {
  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      requirement: '',
      message: '',
    },
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const onSubmit = hookFormSubmit(async (data: LeadInput) => {
    const result = await createLeadAction(data);

    if (result.success) {
      toast.success('Briefing enviado com sucesso!', {
        description: 'Nossa equipe de produção entrará em contato em breve.',
      });
      reset();
    } else {
      toast.error('Ocorreu um problema', {
        description: result.message,
      });
    }
  });

  return {
    register,
    onSubmit,
    errors,
    isSubmitting,
  };
}
