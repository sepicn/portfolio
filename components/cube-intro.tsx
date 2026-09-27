import { SectionHeading } from "@/components/section-heading";

type Item = { title: string; client?: string; arrow: string };

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  hint: string;
  items: Item[];
};

/**
 * First face of the projects cube: the section heading, a contents list of the faces that
 * follow (with the direction each one arrives from) and a spinning wireframe cube, so it is
 * clear from the first screen that the block turns.
 */
export function CubeIntro({ eyebrow, title, lead, hint, items }: Props) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
        <ol className="mt-8 grid max-w-2xl gap-2 sm:grid-cols-2">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="flex items-center gap-3 border border-white/10 bg-night-900/60 notch-one px-3 py-2 [--n:8px] [--nc:rgba(0,229,255,0.35)]"
            >
              <span className="font-mono text-[11px] text-neon-cyan">
                {String(i + 2).padStart(2, "0")}
              </span>
              <span className="w-4 text-center text-neon-pink">{item.arrow}</span>
              <span className="min-w-0 truncate text-sm text-ink-100">
                {item.title}
                {item.client ? (
                  <span className="ml-2 text-xs text-ink-400">{item.client}</span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-8 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
          <span className="cube-next text-base text-neon-pink">↓</span>
          {hint}
        </p>
      </div>
      <div
        aria-hidden="true"
        className="mini-cube order-first mx-auto max-lg:[--s:84px] lg:order-none lg:mr-12"
      >
        <div>
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
          <span>◆</span>
        </div>
      </div>
    </div>
  );
}
