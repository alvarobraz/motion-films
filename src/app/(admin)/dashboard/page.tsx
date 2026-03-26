import { prisma } from '@/lib/prisma';
import { LogoutButton } from '@/app/components/ui/logout-button';

export default async function DashboardPage() {
  const leads = await prisma.lead.findMany({
    include: { customer: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Leads{' '}
            <span className="text-primary text-sm font-normal">
              Motin Films
            </span>
          </h1>
          <p className="mt-1 font-mono text-xs tracking-widest text-zinc-500 uppercase">
            Painel Administrativo
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden rounded-full border border-white/10 bg-zinc-800 px-4 py-2 font-mono text-xs text-zinc-400 sm:block">
            Admin Mode
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="grid gap-4">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20">
            <p className="text-zinc-500">Nenhum lead recebido ainda.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="hover:border-primary/30 group rounded-xl border border-white/5 bg-zinc-900 p-6 transition-colors"
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
                <span className="bg-primary/10 text-primary border-primary/20 rounded-md border px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                  {lead.requirement}
                </span>
              </div>

              <div className="mb-4 rounded-lg border border-white/5 bg-zinc-950/50 p-4">
                <p className="text-sm leading-relaxed text-zinc-300 italic">
                  &quot;{lead.message}&quot;
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-medium text-zinc-600 uppercase">
                <span>Motion Lead ID: {lead.id.split('-')}</span>
                <span>
                  Recebido em:{' '}
                  {new Date(lead.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
