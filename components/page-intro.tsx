type Props = {
  title: string;
  eyebrow?: string;
  intro?: string;
  children?: React.ReactNode;
};

export function PageIntro({ title, eyebrow, intro, children }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6">
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl">
        {title}
      </h1>
      {intro ? <p className="mt-4 max-w-2xl text-lg text-ink-200">{intro}</p> : null}
      {children}
    </section>
  );
}
