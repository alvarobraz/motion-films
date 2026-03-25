import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const leads = await prisma.lead.findMany({
    include: { customer: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Leads{' '}
          <span className="text-primary text-sm font-normal">Motin Films</span>
        </h1>
        <div className="rounded-full border border-white/10 bg-zinc-800 px-4 py-2 font-mono text-xs">
          Admin Mode
        </div>
      </header>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="hover:border-primary/30 rounded-xl border border-white/5 bg-zinc-900 p-6 transition-colors"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">{lead.customer.name}</h3>
                <p className="text-sm text-zinc-500">
                  {lead.customer.email} • {lead.customer.phone}
                </p>
              </div>
              <span className="bg-primary/10 text-primary rounded-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                {lead.requirement}
              </span>
            </div>
            <p className="text-sm text-zinc-400 italic">
              `&quot;`{lead.message}`&quot;`
            </p>
            <div className="mt-4 text-[10px] text-zinc-600 uppercase">
              Recebido em:{' '}
              {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
