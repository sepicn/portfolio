import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ConsentSettingsButton } from "@/components/consent-banner";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 text-sm text-ink-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          &copy; {year} {t("rights")}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:text-neon-cyan">
            {t("privacy")}
          </Link>
          <ConsentSettingsButton label={t("cookies")} />
          <a
            href={siteConfig.github}
            rel="me noopener"
            target="_blank"
            className="hover:text-neon-cyan"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            rel="me noopener"
            target="_blank"
            className="hover:text-neon-cyan"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
