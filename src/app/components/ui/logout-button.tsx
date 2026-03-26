'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });

      if (response.ok) {
        toast.success('Saindo...', { description: 'Até logo!' });

        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      toast.error('Erro ao sair', { description: 'Tente novamente.' });
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/5 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-red-400"
    >
      <LogOut size={16} />
      Sair
    </button>
  );
}
