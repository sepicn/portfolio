import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import scores from "@/content/data/perf-scores.json";

type Run = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  lcp: number;
  cls: number;
  tbt: number;
};
type Entry = {
  url: string;
  date: string;
  source: "pagespeed" | "lighthouse";
  mobile: Run;
  desktop: Run;
};

const all = scores as Record<string, Entry>;

/** Shown only from this mobile performance score up; weaker sites get fixed first. */
const SHOW_FROM = 85;

// Lighthouse's own bands: 90-100 good, 50-89 needs work, below 50 poor.
const band = (score: number) =>
  score >= 90 ? "text-neon-green" : score >= 50 ? "text-neon-sun" : "text-neon-red";

function Gauge({ score, label }: { score: number; label: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <svg viewBox="0 0 56 56" className={`size-16 ${band(score)}`} aria-hidden="true">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="5"
        />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * c} ${c}`}
          transform="rotate(-90 28 28)"
        />
        <text
          x="28"
          y="33"
          textAnchor="middle"
          className="fill-current font-mono text-[15px] font-semibold"
        >
          {score}
        </text>
      </svg>
      <span className="text-xs text-ink-300">{label}</span>
    </div>
  );
}

/**
 * Google PageSpeed Insights results for a project's live site, measured by
 * scripts/perf-scores.mjs and stored with the date, plus a link to run it again.
 * Renders nothing for projects without a measurement or below SHOW_FROM on mobile.
 */
export function PerfScores({ slug, locale }: { slug: string; locale: string }) {
  const t = useTranslations("perf");
  const entry = all[slug];
  if (!entry || entry.mobile.performance < SHOW_FROM) return null;
  const date = new Date(entry.date).toLocaleDateString(
    locale === "en" ? "en-GB" : "sr-Latn-RS",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
  const runs = [
    { key: "mobile", run: entry.mobile },
    { key: "desktop", run: entry.desktop },
  ] as const;

  return (
    <section
      aria-labelledby="perf-title"
      className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"
    >
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase">
          PageSpeed
        </p>
        <h2
          id="perf-title"
          className="mt-3 font-display text-3xl font-semibold text-ink-100"
        >
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-ink-300">{t("lead")}</p>
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {runs.map(({ key, run }) => (
          <Reveal
            key={key}
            className="rounded-2xl border border-white/10 bg-night-900/60 p-6"
          >
            <h3 className="font-mono text-xs tracking-widest text-ink-400 uppercase">
              {t(key)}
            </h3>
            <div className="mt-5 grid grid-cols-4 gap-2">
              <Gauge score={run.performance} label={t("performance")} />
              <Gauge score={run.accessibility} label={t("accessibility")} />
              <Gauge score={run.bestPractices} label={t("bestPractices")} />
              <Gauge score={run.seo} label="SEO" />
            </div>
            <p className="mt-5 font-mono text-xs text-ink-300">
              LCP {(run.lcp / 1000).toFixed(1)} s · CLS {run.cls} · TBT {run.tbt} ms
            </p>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-400">
        {t("measured", {
          date,
          source: t(
            entry.source === "pagespeed" ? "sourcePagespeed" : "sourceLighthouse",
          ),
        })}{" "}
        <a
          href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(entry.url)}`}
          target="_blank"
          rel="noopener"
          className="text-neon-cyan underline-offset-4 hover:underline"
        >
          {t("rerun")} ↗
        </a>
      </p>
    </section>
  );
}
