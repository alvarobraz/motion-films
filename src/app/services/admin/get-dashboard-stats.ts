import { GetDashboardStatsUseCase } from '@/application/use-cases/get-dashboard-stats-use-case';
import { PrismaLeadRepository } from '@/infra/repositories/prisma-lead-repository';

export const dynamic = 'force-dynamic';

const leadRepository = new PrismaLeadRepository();
const getDashboardStatsUseCase = new GetDashboardStatsUseCase(leadRepository);

export async function getDashboardStats(pageParam: number = 1, query?: string) {
  try {
    return await getDashboardStatsUseCase.execute(pageParam, query);
  } catch (error) {
    console.error('[DASHBOARD_STATS_ERROR]:', error);
    throw new Error('Falha ao carregar estatísticas do dashboard');
  }
}
