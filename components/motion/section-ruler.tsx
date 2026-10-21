"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";

type Mark = { id: string; label: string };

export function SectionRuler() {
  const pathname = usePathname();
  const [marks, setMarks] = useState<Mark[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-ruler][id]")];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarks(nodes.map((n) => ({ id: n.id, label: n.dataset.ruler ?? "" })));
    if (!nodes.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const n of nodes) if (n.getBoundingClientRect().top <= line) current = n.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (marks.length < 3) return null;
  return (
    <nav
      aria-label="Sekcije"
      className="fixed top-1/2 right-2 z-30 hidden -translate-y-1/2 2xl:block"
    >
      <ol className="flex flex-col items-end gap-4">
        {marks.map((m) => {
          const on = m.id === active;
          return (
            <li key={m.id}>
              <a
                href={`#${m.id}`}
                aria-current={on ? "location" : undefined}
                className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.06em] uppercase"
              >
                <span
                  className={`transition-opacity ${on ? "text-blue opacity-100" : "text-ink-3 opacity-0 group-hover:opacity-100"}`}
                >
                  {m.label}
                </span>
                <span
                  className={`h-px transition-all duration-500 ease-out-expo ${on ? "w-6 bg-blue" : "w-2.5 bg-ink-3"}`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
