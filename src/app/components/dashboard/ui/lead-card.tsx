import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LeadActionsButtons } from './lead-actions-buttons';

interface LeadCardProps {
  lead: {
    id: string;
    message: string;
    status: 'PENDING' | 'CONTACTED' | 'ARCHIVED';
    createdAt: Date | string;
    customer: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

export function LeadCard({ lead }: LeadCardProps) {
  const isContacted = lead.status === 'CONTACTED';

  return (
    <div
      className={`hover:border-primary/30 group relative rounded-xl border p-6 transition-all ${
        isContacted
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
        <LeadActionsButtons leadId={lead.id} currentStatus={lead.status} />
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
            className={`h-1.5 w-1.5 rounded-full ${
              isContacted ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
          {format(new Date(lead.createdAt), "dd/MM 'às' HH:mm", {
            locale: ptBR,
          })}
        </span>
      </div>
    </div>
  );
}
