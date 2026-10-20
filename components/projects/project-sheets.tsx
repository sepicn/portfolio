"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { projectHref } from "@/i18n/paths";

export type Sheet = {
  slug: string;
  no: string;
  title: string;
  year: string;
  group: "client" | "saas" | "personal";
  kindLabel: string;
  tagline: string;
  image?: string;
  stack: string[];
};

export function ProjectSheets({
  sheets,
  filters,
}: {
  sheets: Sheet[];
  filters: { key: "all" | Sheet["group"]; label: string }[];
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const shown = sheets.filter((s) => filter === "all" || s.group === filter);
  return (
    <>
      <div role="group" className="flex flex-wrap gap-2 border-b border-ink py-4">
        {filters.map((f) => {
          const count = f.key === "all" ? sheets.length : sheets.filter((s) => s.group === f.key).length;
          if (!count) return null;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className="min-h-11 border border-rule bg-paper px-3.5 font-mono text-[13px] text-ink-2 transition-colors hover:border-blue aria-pressed:border-blue aria-pressed:bg-blue aria-pressed:text-paper"
            >
              {f.label} {count}
            </button>
          );
        })}
      </div>
      <ul className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={projectHref(s.slug)}
              className="group flex h-full flex-col border border-ink bg-paper transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_oklch(0.2_0.04_265/0.45)]"
            >
              <div className="img-load relative aspect-[16/10] overflow-hidden border-b border-ink">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    priority={i < 3}
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-[18px]">
                <p className="flex justify-between font-mono text-[12px] text-blue">
                  <span>
                    {s.no} · {s.kindLabel}
                  </span>
                  <span>{s.year}</span>
                </p>
                <h2 className="mt-2 text-[28px] leading-[1.05] tracking-[-0.03em]">{s.title}</h2>
                <p className="mt-2 text-[15px] leading-[1.5] text-ink-2">{s.tagline}</p>
                <p className="mt-auto pt-4 font-mono text-[12px] text-ink-3">{s.stack.slice(0, 4).join(" · ")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
