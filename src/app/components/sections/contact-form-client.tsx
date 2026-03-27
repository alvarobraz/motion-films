'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { SelectInput } from '../ui/select-input';
import { useContactForm } from '@/app/hooks/use-contact-form';

const necessityOptions = [
  { value: 'institucional', label: 'Vídeo Institucional' },
  { value: 'comercial', label: 'Comercial / Publicidade' },
  { value: 'social', label: 'Conteúdo para Redes Sociais' },
  { value: 'evento', label: 'Cobertura de Evento' },
  { value: 'documentario', label: 'Documentário / Storytelling' },
];

export function ContactFormClient() {
  const { register, onSubmit, errors, isSubmitting } = useContactForm();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        {...register('name')}
        placeholder="Nome completo"
        error={errors.name?.message}
      />

      <div className="grid grid-cols-1 gap-4">
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
        className="h-12 w-full"
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
  );
}
