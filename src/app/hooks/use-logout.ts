'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });

      if (response.ok) {
        toast.success('Saindo...', { description: 'Até logo!' });

        router.push('/login');
        router.refresh();
      } else {
        throw new Error('Falha na resposta do servidor');
      }
    } catch (error) {
      toast.error('Erro ao sair', { description: 'Tente novamente.' });
    } finally {
      setIsLoggingOut(false);
    }
  }

  return {
    handleLogout,
    isLoggingOut,
  };
}
