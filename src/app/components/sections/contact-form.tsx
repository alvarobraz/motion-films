'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { leadSchema, LeadInput } from '@/lib/schemas';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { createLeadAction } from '@/app/actions/create-lead';
import { SelectInput } from '../ui/select-input';

const necessityOptions = [
  { value: 'institucional', label: 'Vídeo Institucional' },
  { value: 'comercial', label: 'Comercial / Publicidade' },
  { value: 'social', label: 'Conteúdo para Redes Sociais' },
  { value: 'evento', label: 'Cobertura de Evento' },
  { value: 'documentario', label: 'Documentário / Storytelling' },
];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  async function onSubmit(data: LeadInput) {
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
  }

  return (
    <section id="contato" className="bg-zinc-900 px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Lado Esquerdo: Info */}
          <div>
            <h2 className="mb-6 text-4xl font-bold text-white">
              Pronto para o <span className="text-primary">próximo nível?</span>
            </h2>
            <p className="mb-8 text-lg text-zinc-400">
              Deixe seus dados e vamos transformar sua visão em cinema.
            </p>
          </div>

          {/* Lado Direito: Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('name')}
              placeholder="Nome completo"
              error={errors.name?.message}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <Input
                {...register('email')}
                placeholder="E-mail"
                type="email"
                error={errors.email?.message}
              />
              <SelectInput
                {...register('requirement')}
                options={necessityOptions}
                error={errors.requirement?.message}
              />
              <Input
                {...register('phone')}
                placeholder="WhatsApp"
                error={errors.phone?.message}
              />
            </div>

            <Textarea
              {...register('message')}
              placeholder="Conte-nos sobre o projeto..."
              error={errors.message?.message}
            />

            <Button
              type="submit"
              variant="brand"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Briefing'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
