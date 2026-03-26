'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchLeads() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex w-full gap-8 sm:flex-row md:flex-row lg:flex-row">
      <div className="relative w-full">
        <input
          className="focus:border-primary/50 w-full rounded-lg border border-white/5 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-zinc-500 transition-colors outline-none"
          placeholder="Buscar por nome ou email..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('q')?.toString()}
        />
      </div>
    </div>
  );
}
