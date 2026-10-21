import { Link } from "@/i18n/navigation";

export function PageHead({
  crumbs,
  tag,
  title,
  lead,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  tag: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-ink pb-8 lg:pb-10">
      <nav aria-label="Breadcrumb" className="py-3.5">
        <ol className="flex flex-wrap gap-2.5 font-mono text-[12px] tracking-[0.06em] text-ink-3 uppercase">
          {crumbs.map((c, i) => (
            <li key={c.label} className="flex gap-2.5">
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              {c.href ? (
                <Link href={c.href} className="hover:text-blue">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-blue">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="grid items-end gap-6 pt-10 lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:pt-14">
        <div>
          <p className="tag">{tag}</p>
          <h1 className="mt-3.5 text-[clamp(3rem,8vw,9rem)] leading-[0.9] tracking-[-0.05em]">
            {title}
            <span className="text-blue">.</span>
          </h1>
        </div>
        <div>
          {lead ? (
            <p className="max-w-[52ch] bg-bg/90 text-[17px] leading-[1.55] text-ink-2 lg:text-[18px]">
              {lead}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
