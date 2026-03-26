import { LogoutButton } from '@/app/components/ui/logout-button';

export function DashboardHeader() {
  return (
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
  );
}
