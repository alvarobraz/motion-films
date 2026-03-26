interface ConversionCardProps {
  leads: {
    status: string;
  }[];
}

export function ConversionCard({ leads }: ConversionCardProps) {
  const totalLeads = leads.length;
  const contactedLeads = leads.filter((l) => l.status === 'CONTACTED').length;
  const conversionRate = Math.round((contactedLeads / totalLeads) * 100 || 0);

  return (
    <div className="w-full rounded-xl border border-white/5 bg-zinc-900 p-6 shadow-sm">
      <h4 className="mb-4 text-xs font-bold tracking-widest text-zinc-500 uppercase">
        Conversão desta página
      </h4>
      <div className="flex items-end gap-2">
        <span className="text-primary text-4xl font-black">
          {conversionRate}%
        </span>
        <span className="mb-1 text-sm text-zinc-400">contatados</span>
      </div>
    </div>
  );
}
