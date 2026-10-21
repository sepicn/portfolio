import { experience } from "@/content/data/experience";
import { home } from "@/content/data/home";
import { pick } from "@/content/i18n";

const months = {
  sr: [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "avg",
    "sep",
    "okt",
    "nov",
    "dec",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

function month(value: string, locale: string) {
  const [y, m] = value.split("-");
  return `${months[locale === "en" ? "en" : "sr"][Number(m) - 1]} ${y}`;
}

export function Jobs({ locale }: { locale: string }) {
  const rows = experience.map((job) => ({
    key: job.id,
    now: job.end === null,
    period: `${month(job.start, locale)} · ${job.end ? month(job.end, locale) : pick(home.now, locale)}`,
    title: pick(job.role, locale),
    place: `${job.company}, ${pick(job.location, locale)}`,
    note: pick(
      home.jobsShort[job.id as keyof typeof home.jobsShort] ?? job.summary,
      locale,
    ),
  }));
  rows.push({
    key: "edu",
    now: false,
    period: home.education.period,
    title: pick(home.education.title, locale),
    place: pick(home.education.place, locale),
    note: pick(home.education.note, locale),
  });

  return (
    <ol className="border-l border-blue pl-6 lg:pl-7">
      {rows.map((r) => (
        <li
          key={r.key}
          data-reveal="left"
          className="relative mb-3 grid gap-1.5 border border-rule bg-paper px-4 py-5 lg:grid-cols-[200px_1fr_1.3fr] lg:gap-7 lg:px-6 lg:py-6"
        >
          <span
            aria-hidden="true"
            className={`absolute top-[26px] -left-[31px] size-[11px] border-2 border-blue lg:top-8 lg:-left-[35px] ${r.now ? "bg-blue" : "bg-bg"}`}
          />
          <span className="font-mono text-[13px] text-blue lg:pt-1.5 lg:text-[14px] lg:text-ink-2">
            {r.period}
          </span>
          <div>
            <h3 className="text-[24px] leading-[1.15] tracking-[-0.025em]">{r.title}</h3>
            <p className="mt-1 text-[15px] text-ink-2">{r.place}</p>
          </div>
          <p className="text-[16px] leading-[1.55] text-ink-2">{r.note}</p>
        </li>
      ))}
    </ol>
  );
}
