import { ILeadRepository } from '@/domain/repositories/lead-repository';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export class GetDashboardStatsUseCase {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(page: number = 1, query?: string) {
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const [{ leads, total }, allLeadsDates] = await Promise.all([
      this.leadRepository.findManyWithPagination(skip, pageSize, query),
      this.leadRepository.findAllCreatedAt(),
    ]);

    const last7Days = Array.from({ length: 7 })
      .map((_, i) => format(subDays(new Date(), i), 'yyyy-MM-dd'))
      .reverse();

    const chartData = last7Days.map((dateStr) => {
      const count = allLeadsDates.filter(
        (lead) => format(lead.createdAt, 'yyyy-MM-dd') === dateStr
      ).length;

      return {
        date: format(new Date(dateStr + 'T00:00:00'), 'dd/MM', {
          locale: ptBR,
        }),
        count,
      };
    });

    return {
      leads,
      chartData,
      pagination: {
        totalCount: total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
      },
    };
  }
}
