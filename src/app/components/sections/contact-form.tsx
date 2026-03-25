'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, LeadInput } from '@/lib/schemas';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  async function onSubmit(data: LeadInput) {
    setIsSubmitting(true);
    try {
      console.log('Dados do lead:', data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      reset();
    } catch (error) {
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contato" className="bg-zinc-900 px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Coluna de Texto */}
          <div>
            <h2 className="mb-6 text-4xl font-bold text-white">
              Vamos tirar sua{' '}
              <span className="text-primary">ideia do papel?</span>
            </h2>
            <p className="mb-8 text-lg text-gray-400">
              Preencha o formulário e nossa equipe de produção entrará em
              contato em até 24h.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <span className="text-primary font-bold">📍</span> Curitiba, PR
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <span className="text-primary font-bold">✉️</span>{' '}
                contato@motinfilms.com.br
              </div>
            </div>
          </div>

          {/* Coluna do Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-2xl border border-white/5 bg-zinc-800 p-8"
          >
            <div>
              <Input
                {...register('name')}
                placeholder="Nome completo"
                error={errors.name?.message}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                {...register('email')}
                placeholder="E-mail"
                type="email"
                error={errors.email?.message}
              />
              <Input
                {...register('phone')}
                placeholder="WhatsApp"
                error={errors.phone?.message}
              />
            </div>

            <div>
              <Textarea
                {...register('message')}
                placeholder="Fale um pouco sobre o vídeo que você precisa..."
                error={errors.message?.message}
              />
            </div>

            <Button
              type="submit"
              variant="brand"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
            </Button>

            {success && (
              <p className="animate-pulse text-center text-sm font-medium text-green-400">
                Recebemos seu contato! Em breve falaremos com você.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
