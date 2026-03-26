import { LogoutButton } from '@/app/components/ui/logout-button';
import { LeadActionsButtons } from '@/app/components/dashboard/ui/lead-actions-buttons';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const leads = await prisma.lead.findMany({
    include: { customer: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="mb-12">
        <section className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight italic">
              LEADS{' '}
              <span className="text-primary text-sm font-normal not-italic">
                ({leads.length})
              </span>
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Gerencie as solicitações de orçamento recebidas.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LogoutButton />
          </div>
        </section>
      </div>

      <div className="grid gap-4">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20">
            <p className="text-zinc-500 italic">Nenhum lead recebido ainda.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className={`hover:border-primary/30 group relative rounded-xl border p-6 transition-all ${
                lead.status === 'CONTACTED'
                  ? 'border-emerald-500/20 bg-emerald-500/[0.02]'
                  : 'border-white/5 bg-zinc-900 hover:bg-zinc-900/50'
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
                    {lead.customer.name}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {lead.customer.email} • {lead.customer.phone}
                  </p>
                </div>

                {/* BOTÕES DE AÇÃO AQUI */}
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
                <span>ID: {lead.id.split('-')}</span>
                <span className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${lead.status === 'CONTACTED' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  />
                  {new Date(lead.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
