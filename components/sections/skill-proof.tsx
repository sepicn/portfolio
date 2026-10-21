import { pick } from "@/content/i18n";
import { techStack } from "@/content/data/home";

export function SkillProof({ locale }: { locale: string }) {
  return (
    <div className="grid border-t border-l border-ink sm:grid-cols-2 lg:grid-cols-5">
      {techStack.map((group, i) => (
        <div
          key={group.group.en}
          data-reveal
          style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
          className="border-r border-b border-ink bg-paper p-5 lg:p-6"
        >
          <h3 className="font-mono text-[13px] font-medium tracking-[0.06em] text-blue uppercase">
            {pick(group.group, locale)}
          </h3>
          <ul className="mt-5 space-y-2.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="text-[18px] leading-[1.25] font-medium tracking-[-0.015em]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
