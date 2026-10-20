"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/site-config";

export function NavLinks({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  return (
    <>
      {navItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={
              className ??
              "underline-offset-[6px] transition-colors hover:text-blue aria-[current=page]:text-blue aria-[current=page]:underline"
            }
          >
            {t(item.key)}
          </Link>
        );
      })}
    </>
  );
}
