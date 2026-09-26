type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "right";
};

export function SectionHeading({ eyebrow, title, lead, align = "left" }: Props) {
  return (
    <div className={`max-w-2xl ${align === "right" ? "ml-auto text-right" : ""}`}>
      <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-lg text-ink-200">{lead}</p> : null}
    </div>
  );
}
