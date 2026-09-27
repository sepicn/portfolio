"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/site-config";

/** Home only matches itself; every other item also owns its sub-pages (/projects/[slug]). */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Neon marker under the active item: a circuit trace with angled ends and a diamond in the
 * middle, lit like a tube striking. Decorative, so hidden from assistive tech; the link
 * itself carries aria-current.
 */
export function ActiveMarker({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 8"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={`nav-marker pointer-events-none text-neon-cyan ${className}`}
    >
      <path d="M0 7L4 3H24" vectorEffect="non-scaling-stroke" />
      <path d="M36 3H56L60 7" vectorEffect="non-scaling-stroke" />
      <path d="M30 0.6L33.4 4L30 7.4L26.6 4Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function NavLinks() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return navItems.map((item) => {
    const active = isActivePath(pathname, item.href);
    return (
      <Link
        key={item.key}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
          active
            ? "text-neon-cyan text-glow-cyan"
            : "text-ink-200 hover:bg-white/5 hover:text-ink-100"
        }`}
      >
        {t(item.key)}
        {active ? (
          <ActiveMarker className="absolute inset-x-1 -bottom-0.5 h-2 w-[calc(100%-0.5rem)]" />
        ) : null}
      </Link>
    );
  });
}
