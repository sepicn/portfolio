import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/site-config";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { MusicToggle } from "./music-toggle";
import { CyberDivider } from "./cyber-divider";

export function SiteHeader() {
  const t = useTranslations("nav");
  const site = useTranslations("site");

  return (
    <header className="sticky top-0 z-40 bg-night-900/70 backdrop-blur-md">
      <CyberDivider
        variant={2}
        className="pointer-events-none absolute inset-x-0 bottom-0 text-white/10"
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* The mark is the brand: a neon code tag on a synthwave sun (blender/render_logo.py).
            The name stays in the accessible label for screen readers and search. */}
        <Link href="/" aria-label={site("name")} className="group -m-1 rounded-full p-1">
          <Image
            src="/images/logo.webp"
            alt=""
            width={44}
            height={44}
            preload
            className="size-11 transition duration-300 group-hover:rotate-[-8deg] group-hover:drop-shadow-[0_0_12px_rgba(255,45,149,0.7)]"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-ink-200 transition-colors hover:bg-white/5 hover:text-ink-100"
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitcher />
          <div className="ml-3">
            <MusicToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <MusicToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
