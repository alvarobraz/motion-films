'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Trash2,
  Loader2,
  Archive,
  ArchiveRestore,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  deleteLeadAction,
  updateLeadStatusAction,
} from '@/app/actions/lead-actions';

interface LeadActionsProps {
  leadId: string;
  currentStatus: 'PENDING' | 'CONTACTED' | 'ARCHIVED';
}

export function LeadActionsButtons({
  leadId,
  currentStatus,
}: LeadActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir este lead?')) return;

    setIsDeleting(true);
    const result = await deleteLeadAction(leadId);
    if (result.success) toast.success('Lead removido!');
    else toast.error(result.message);
    setIsDeleting(false);
  }

  async function handleStatus() {
    setIsUpdating(true);

    const nextStatus = currentStatus === 'CONTACTED' ? 'PENDING' : 'CONTACTED';
    const result = await updateLeadStatusAction(leadId, nextStatus);

    if (result.success) toast.success('Status atualizado!');
    else toast.error(result.message);
    setIsUpdating(false);
  }

  async function handleArchive() {
    setIsArchiving(true);
    const nextStatus = currentStatus === 'ARCHIVED' ? 'PENDING' : 'ARCHIVED';
    const result = await updateLeadStatusAction(leadId, nextStatus);

    if (result.success) {
      toast.success(
        nextStatus === 'ARCHIVED' ? 'Lead arquivado!' : 'Lead restaurado!'
      );
    } else {
      toast.error(result.message);
    }
    setIsArchiving(false);
  }

  return (
    <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
      {/* Botão de Contato */}
      <button
        onClick={handleStatus}
        disabled={isUpdating || isArchiving}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold tracking-wider uppercase transition-colors ${
          currentStatus === 'CONTACTED'
            ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
            : 'border border-white/5 bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
        } ${currentStatus === 'ARCHIVED' && 'opacity-50 grayscale'}`}
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
        onClick={handleArchive}
        disabled={isArchiving || isUpdating}
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
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-zinc-800 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
      >
        {isDeleting ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Trash2 size={14} />
        )}
      </button>
    </div>
  );
}
