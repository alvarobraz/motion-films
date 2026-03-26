import { LeadActionsButtons } from '@/app/components/dashboard/ui/lead-actions-buttons';
import { LeadsChart } from '@/app/components/dashboard/leads-chart';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getDashboardStats } from '@/app/services/admin/get-dashboard-stats';
import { Pagination } from '@/app/components/dashboard/ui/Pagination';
import { SearchLeads } from '@/app/components/dashboard/ui/search-leads';
import { DashboardHeader } from '@/app/components/dashboard/ui/header';
import { LeadCard } from '@/app/components/dashboard/ui/lead-card';
import { ConversionCard } from '@/app/components/dashboard/ui/conversion-card';

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const query = params.q || '';

  const { leads, chartData, pagination } = await getDashboardStats(
    currentPage,
    query
  );

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Header */}
      <DashboardHeader />

      {/* Search */}
      <SearchLeads />

      {/* List leads */}
      <div className="flex w-full flex-col gap-8 sm:flex-row md:flex-row lg:flex-row">
        <div className="flex flex-col gap-4 sm:w-[70%] md:w-[70%] lg:w-[70%]">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-xs font-bold tracking-widest text-zinc-200 uppercase">
              Últimos Leads ({leads.length})
            </h3>
          </div>

          <div key={pagination.currentPage} className="flex flex-col gap-4">
            {leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20">
                <p className="text-zinc-500 italic">
                  Nenhum lead recebido ainda.
                </p>
              </div>
            ) : (
              leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
            )}
            {leads.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )}
          </div>
        </div>
        {/* Chart */}
        <aside className="top-50px relative flex h-100 flex-col items-start gap-4">
          <div className="flex items-center border-b border-white/5 pb-4">
            <h3 className="text-xs font-bold tracking-widest text-zinc-200 uppercase">
              Estatísticas
            </h3>
          </div>
          <LeadsChart data={chartData} />
          <ConversionCard leads={leads} />
        </aside>
      </div>
    </div>
  );
}
