'use client';

import {
  CheckCircle2,
  Trash2,
  Loader2,
  Archive,
  ArchiveRestore,
} from 'lucide-react';
import { useLeadActions } from '@/app/hooks/use-lead-actions';
import { ConfirmModal } from './confirm-modal';

interface LeadActionsProps {
  leadId: string;
  currentStatus: 'PENDING' | 'CONTACTED' | 'ARCHIVED';
}

export function LeadActionsButtons({
  leadId,
  currentStatus,
}: LeadActionsProps) {
  const {
    handleStatusToggle,
    handleArchiveToggle,
    handleDelete,
    setIsModalOpen,
    isModalOpen,
    isUpdating,
    isArchiving,
    isDeleting,
  } = useLeadActions({ leadId, currentStatus });

  const isAnyActionLoading = isDeleting || isUpdating || isArchiving;

  return (
    <div className="flex items-center gap-2 transition-all">
      {/* Botão de Contato */}
      <button
        onClick={handleStatusToggle}
        disabled={isAnyActionLoading}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold tracking-wider uppercase transition-colors ${
          currentStatus === 'CONTACTED'
            ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
            : 'border border-white/5 bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
        } ${currentStatus === 'ARCHIVED' && 'cursor-not-allowed opacity-50 grayscale'}`}
      >
        {isUpdating ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <CheckCircle2 size={14} />
        )}
        {currentStatus === 'CONTACTED' ? 'Contatado' : 'Marcar Contato'}
      </button>

      {/* Botão de Arquivar */}
      <button
        onClick={handleArchiveToggle}
        disabled={isAnyActionLoading}
        title={currentStatus === 'ARCHIVED' ? 'Restaurar' : 'Arquivar'}
        className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 transition-colors ${
          currentStatus === 'ARCHIVED'
            ? 'border-amber-500/20 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
        }`}
      >
        {isArchiving ? (
          <Loader2 size={14} className="animate-spin" />
        ) : currentStatus === 'ARCHIVED' ? (
          <ArchiveRestore size={14} />
        ) : (
          <Archive size={14} />
        )}
      </button>

      {/* Botão de Excluir */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-red-500/10 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Excluir Lead"
        description="Tem certeza que deseja remover este lead? Esta ação não pode ser desfeita."
      />
    </div>
  );
}
