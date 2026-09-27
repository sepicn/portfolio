import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ConsentSettingsButton } from "@/components/consent-banner";
import { siteConfig } from "@/lib/site-config";
import { CyberDivider } from "@/components/cyber-divider";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="pb-10 text-sm text-ink-400">
      <CyberDivider variant={5} className="mb-10 text-white/10" />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-1">
          <p>
            &copy; {year} {t("rights")}
          </p>
          <p className="text-xs">{t("location")}</p>
          {/* CC BY 4.0 requires credit; the other models in the room are CC0 (blender/assets/README.md). */}
          <p className="text-xs">
            {t("credit")}{" "}
            <a
              href="https://blendswap.com/blend/26625"
              rel="noopener"
              target="_blank"
              className="inline-block py-1 hover:text-neon-cyan"
            >
              Retro computer
            </a>
            , senmurai,{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              rel="license noopener"
              target="_blank"
              className="inline-block py-1 hover:text-neon-cyan"
            >
              CC BY 4.0
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="inline-block py-1 hover:text-neon-cyan">
            {t("privacy")}
          </Link>
          <ConsentSettingsButton label={t("cookies")} />
          <a
            href={siteConfig.github}
            rel="me noopener"
            target="_blank"
            className="inline-block py-1 hover:text-neon-cyan"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            rel="me noopener"
            target="_blank"
            className="inline-block py-1 hover:text-neon-cyan"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
