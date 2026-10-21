export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-ink">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-rule">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[19px] font-medium tracking-[-0.015em] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center border border-ink font-mono text-[18px] transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[68ch] pb-6 text-[17px] leading-[1.6] text-ink-2">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
