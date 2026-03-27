export default function Loading() {
  return (
    <div className="flex animate-pulse flex-col gap-8 py-4">
      {/* Título/Breadcrumb Skeleton */}
      <div className="bg-surface h-8 w-48 rounded" />

      {/* Search Bar Skeleton */}
      <div className="bg-surface h-12 w-full rounded-xl" />

      <div className="flex flex-col gap-8 sm:flex-row">
        {/* List Leads Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="bg-surface mb-6 h-6 w-32 rounded" />

          {/*Cards de placeholder */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface/50 border-border-subtle h-32 w-full rounded-2xl border"
            />
          ))}
        </div>

        {/* Aside/Chart Skeleton */}
        <div className="flex flex-col gap-4 sm:w-[30%]">
          <div className="bg-surface mb-2 h-6 w-24 rounded" />
          <div className="bg-surface/50 border-border-subtle h-75 w-full rounded-2xl border" />
          <div className="bg-surface/50 border-border-subtle h-32 w-full rounded-2xl border" />
        </div>
      </div>
    </div>
  );
}
