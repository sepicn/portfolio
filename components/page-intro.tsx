type Props = {
  title: string;
  eyebrow?: string;
  intro?: string;
  children?: React.ReactNode;
  /** Shown beside the heading on wide screens and below it on phones, e.g. a floating prop. */
  aside?: React.ReactNode;
};

export function PageIntro({ title, eyebrow, intro, children, aside }: Props) {
  const text = (
    <div>
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
    </div>
  );

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6">
      {aside ? (
        <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr]">
          {text}
          <div className="mx-auto w-40 sm:w-56 md:w-72">{aside}</div>
        </div>
      ) : (
        text
      )}
    </section>
  );
}
