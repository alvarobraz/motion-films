import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export async function getDashboardStats(pageParam: number = 1, query?: string) {
  const page = Math.max(1, pageParam);
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const where = query
    ? {
        OR: [
          {
            customer: {
              name: { contains: query, mode: 'insensitive' as const },
            },
          },
          {
            customer: {
              email: { contains: query, mode: 'insensitive' as const },
            },
          },
        ],
      }
    : {};

  const [leads, totalCount] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: pageSize,
    }),
    prisma.lead.count({ where }),
  ]);

  const allLeadsForChart = await prisma.lead.findMany({
    select: { createdAt: true },
  });

  const last7Days = Array.from({ length: 7 })
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return format(date, 'yyyy-MM-dd');
    })
    .reverse();

  const chartData = last7Days.map((dateStr) => {
    const count = allLeadsForChart.filter(
      (lead) => format(new Date(lead.createdAt), 'yyyy-MM-dd') === dateStr
    ).length;

    return {
      date: format(new Date(dateStr), 'dd/MM', { locale: ptBR }),
      count,
    };
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    leads,
    chartData,
    allLeadsForChart,
    pagination: {
      totalCount,
      totalPages,
      currentPage: page,
    },
  };
}
