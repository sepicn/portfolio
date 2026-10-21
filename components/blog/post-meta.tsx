import { formatDate } from "@/lib/format";

type Props = {
  category: string;
  minutes?: string;
  date: string;
  locale: string;
  size?: "lg" | "sm";
};

function Clock() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-[1.1em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.5 1.5" strokeLinecap="square" />
    </svg>
  );
}

function Calendar() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-[1.1em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="3" width="12" height="11" />
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" />
    </svg>
  );
}

export function PostMeta({ category, minutes, date, locale, size = "lg" }: Props) {
  const chip =
    size === "lg"
      ? "inline-flex min-h-9 items-center gap-2 border px-3 text-[13px] lg:text-[14px]"
      : "inline-flex min-h-8 items-center gap-1.5 border px-2.5 text-[12px]";
  return (
    <p className="flex flex-wrap gap-2 font-mono tracking-[0.05em] uppercase">
      <span className={`${chip} border-blue bg-blue text-paper`}>{category}</span>
      {minutes ? (
        <span className={`${chip} border-ink bg-paper font-medium text-ink`}>
          <Clock />
          {minutes}
        </span>
      ) : null}
      <span className={`${chip} border-ink bg-paper text-ink`}>
        <Calendar />
        <time dateTime={date}>{formatDate(date, locale)}</time>
      </span>
    </p>
  );
}
