/** A pulsing status light with a label, e.g. availability on the contact page. */
export function SignalLed({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-neon-green uppercase ${className}`}
    >
      <span className="relative flex size-2.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-neon-green/70" />
        <span className="relative size-2.5 rounded-full bg-neon-green shadow-[0_0_10px_rgba(57,255,136,0.8)]" />
      </span>
      {label}
    </span>
  );
}
