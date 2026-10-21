export function SectionHead({
  tag,
  title,
  lead,
  id,
  dark = false,
  children,
}: {
  tag: string;
  title: string;
  lead?: string;
  id?: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div data-reveal className="mb-10 grid items-end gap-4 lg:grid-cols-2 lg:gap-10">
      <div>
        <p className={`tag ${dark ? "text-blue-2" : ""}`}>{tag}</p>
        <h2 id={id} className="mt-3 text-display">
          {title}
        </h2>
      </div>
      <div>
        {lead ? (
          <p
            className={`max-w-[46ch] text-[16px] leading-[1.55] lg:text-[18px] ${dark ? "text-paper/80" : "text-ink-2"}`}
          >
            {lead}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
