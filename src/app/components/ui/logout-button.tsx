'use client';

import { LogOut, Loader2 } from 'lucide-react';
import { useLogout } from '@/app/hooks/use-logout';

export function LogoutButton() {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/5 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoggingOut ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <LogOut size={16} />
      )}
      <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
    </button>
  );
}
