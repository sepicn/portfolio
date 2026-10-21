import type { Block } from "@/content/blog";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugify(b.text)}
                className="mt-12 mb-4 scroll-mt-6 text-[clamp(26px,3vw,34px)] leading-[1.15] tracking-[-0.03em]"
              >
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p
                key={i}
                className="mb-5 text-[17px] leading-[1.7] text-ink lg:text-[19px]"
              >
                {b.text}
              </p>
            );
          case "list":
            return (
              <ul
                key={i}
                className="mb-6 space-y-2.5 text-[17px] leading-[1.6] lg:text-[18px]"
              >
                {b.items.map((item) => (
                  <li key={item} className="grid grid-cols-[18px_1fr] gap-2.5">
                    <span aria-hidden="true" className="mt-[0.8em] h-px w-3.5 bg-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <p
                key={i}
                className="my-7 border-l-2 border-blue bg-paper py-4 pr-4 pl-5 text-[16px] leading-[1.6] text-ink-2 lg:text-[17px]"
              >
                {b.text}
              </p>
            );
          case "options":
            return (
              <div key={i} className="my-7 grid gap-3 md:grid-cols-3">
                {b.items.map((o) => (
                  <div
                    key={o.name}
                    className={`bg-paper p-[18px] ${o.highlight ? "border-2 border-blue" : "border border-ink"}`}
                  >
                    <h3 className="text-[22px] tracking-[-0.02em]">{o.name}</h3>
                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-dashed border-rule pt-2.5 text-[15px]">
                      {o.rows.map(([k, v]) => (
                        <div key={k} className="contents">
                          <dt className="text-ink-2">{k}</dt>
                          <dd className="text-right font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-3 text-[15px] leading-[1.45] text-ink-2">{o.note}</p>
                  </div>
                ))}
              </div>
            );
        }
      })}
    </>
  );
}
