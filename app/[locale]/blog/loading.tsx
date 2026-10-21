export default function Loading() {
  return (
    <div className="wrap" role="status" aria-live="polite">
      <span className="sr-only">Učitavanje / Loading</span>
      <div className="border-b border-ink pb-10">
        <div className="skeleton mt-4 h-3 w-48" />
        <div className="grid items-end gap-6 pt-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="skeleton h-3 w-32" />
            <div className="skeleton mt-5 h-[clamp(3rem,8vw,8rem)] w-3/4" />
          </div>
          <div className="space-y-3">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-2/3" />
          </div>
        </div>
      </div>
      <div className="relative mt-10 h-0.5 overflow-hidden bg-rule">
        <i className="absolute inset-0 origin-left [animation:draw-line_1.2s_var(--ease-in-out-expo)_infinite] bg-blue" />
      </div>
      <p className="label mt-3">Iscrtavanje nacrta...</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-ink bg-paper">
            <div className="img-load aspect-[16/10] border-b border-ink" />
            <div className="space-y-2.5 p-[18px]">
              <div className="skeleton h-3 w-24" />
              <div className="skeleton h-6 w-1/2" />
              <div className="skeleton h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
