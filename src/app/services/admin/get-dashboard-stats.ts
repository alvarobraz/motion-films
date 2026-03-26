// src/app/services/admin/get-dashboard-stats.ts
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export async function getDashboardStats() {
  const leads = await prisma.lead.findMany({
    include: { customer: true },
    orderBy: { createdAt: 'desc' },
  });

  const last7Days = Array.from({ length: 7 })
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return format(date, 'yyyy-MM-dd');
    })
    .reverse();

  const chartData = last7Days.map((dateStr) => {
    const count = leads.filter(
      (lead) => format(new Date(lead.createdAt), 'yyyy-MM-dd') === dateStr
    ).length;

    return {
      date: format(new Date(dateStr), 'dd/MM', { locale: ptBR }),
      count,
    };
  });

  const contactedCount = leads.filter((l) => l.status === 'CONTACTED').length;
  const conversionRate = Math.round((contactedCount / leads.length) * 100 || 0);

  return {
    leads,
    chartData,
    stats: {
      total: leads.length,
      contactedCount,
      conversionRate,
    },
  };
}
