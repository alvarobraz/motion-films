import { LogoutButton } from '@/app/components/ui/logout-button';
import { LeadActionsButtons } from '@/app/components/dashboard/ui/lead-actions-buttons';
import { LeadsChart } from '@/app/components/dashboard/leads-chart';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getDashboardStats } from '@/app/services/admin/get-dashboard-stats';
import { Pagination } from '@/app/components/dashboard/ui/Pagination';

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const { leads, chartData, pagination } = await getDashboardStats(currentPage);

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Header */}
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase italic">
            Dashboard <span className="text-primary not-italic">BI</span>
          </h2>
          <p className="text-sm text-zinc-500">
            Acompanhe a performance da Motin Films.
          </p>
        </div>
        <LogoutButton />
      </section>

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
              leads.map((lead) => (
                <div
                  key={lead.id}
                  className={`hover:border-primary/30 group relative rounded-xl border p-6 transition-all ${
                    lead.status === 'CONTACTED'
                      ? 'border-emerald-500/20 bg-emerald-500/2'
                      : 'border-white/5 bg-zinc-900 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="group-hover:text-primary text-lg font-bold text-white transition-colors">
                        {lead.customer.name}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {lead.customer.email} • {lead.customer.phone}
                      </p>
                    </div>
                    <LeadActionsButtons
                      leadId={lead.id}
                      currentStatus={lead.status}
                    />
                  </div>

                  <div className="mb-4 rounded-lg border border-white/5 bg-zinc-950/50 p-4">
                    <p className="text-sm leading-relaxed text-zinc-300 italic">
                      &quot;{lead.message}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-medium tracking-wider text-zinc-600 uppercase">
                    <span>ID: {lead.id.substring(0, 8)}</span>
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${lead.status === 'CONTACTED' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      />
                      {format(new Date(lead.createdAt), "dd/MM 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
            {leads.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )}
          </div>
        </div>

        <aside className="top-50px relative flex h-100 flex-col items-start gap-4">
          <div className="flex items-center border-b border-white/5 pb-4">
            <h3 className="text-xs font-bold tracking-widest text-zinc-200 uppercase">
              Estatísticas
            </h3>
          </div>
          <LeadsChart data={chartData} />
          <div className="w-full rounded-xl border border-white/5 bg-zinc-900 p-6 shadow-sm">
            <h4 className="mb-4 text-xs font-bold tracking-widest text-zinc-500 uppercase">
              Conversão
            </h4>
            <div className="flex items-end gap-2">
              <span className="text-primary text-4xl font-black">
                {Math.round(
                  (leads.filter((l) => l.status === 'CONTACTED').length /
                    leads.length) *
                    100 || 0
                )}
                %
              </span>
              <span className="mb-1 text-sm text-zinc-400">contatados</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
