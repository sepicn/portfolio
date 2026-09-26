type Props = { items: string[]; reverse?: boolean; className?: string };

/** An endless neon ticker. Pure CSS animation, pauses on hover, static under reduced motion. */
export function Marquee({ items, reverse = false, className = "" }: Props) {
  const row = [...items, ...items];
  return (
    <div
      className={`marquee relative overflow-hidden border-y border-white/5 py-4 ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex w-max gap-10 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm tracking-widest text-ink-400 uppercase"
          >
            {item}
            <span className="size-1.5 rounded-full bg-neon-pink shadow-neon-pink" />
          </span>
        ))}
      </div>
    </div>
  );
}
