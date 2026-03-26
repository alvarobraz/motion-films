'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  deleteLeadAction,
  updateLeadStatusAction,
} from '@/app/actions/lead-actions';

interface UseLeadActionsProps {
  leadId: string;
  currentStatus: 'PENDING' | 'CONTACTED' | 'ARCHIVED';
}

export function useLeadActions({ leadId, currentStatus }: UseLeadActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const result = await deleteLeadAction(leadId);

      if (result.success) toast.success('Lead removido!');
      else toast.error(result.message);

      setIsDeleting(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  }

  async function handleStatusToggle() {
    setIsUpdating(true);
    const nextStatus = currentStatus === 'CONTACTED' ? 'PENDING' : 'CONTACTED';
    const result = await updateLeadStatusAction(leadId, nextStatus);

    if (result.success) toast.success('Status atualizado!');
    else toast.error(result.message);

    setIsUpdating(false);
  }

  async function handleArchiveToggle() {
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

  return {
    handleDelete,
    handleStatusToggle,
    handleArchiveToggle,
    setIsModalOpen,
    isLoading: isDeleting || isUpdating || isArchiving,
    isDeleting,
    isUpdating,
    isArchiving,
    isModalOpen,
  };
}
