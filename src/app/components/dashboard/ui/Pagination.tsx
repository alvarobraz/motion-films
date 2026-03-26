import Link from 'next/link';

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="mt-6 flex items-center gap-4">
      <Link
        href={`?page=${currentPage - 1}`}
        className={`rounded-lg border border-white/5 bg-zinc-900 px-4 py-2 text-sm ${currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-zinc-800'}`}
      >
        Anterior
      </Link>
      <span className="text-sm text-zinc-400">
        Página {currentPage} de {totalPages}
      </span>
      <Link
        href={`?page=${currentPage + 1}`}
        className={`rounded-lg border border-white/5 bg-zinc-900 px-4 py-2 text-sm ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-zinc-800'}`}
      >
        Próxima
      </Link>
    </div>
  );
}
