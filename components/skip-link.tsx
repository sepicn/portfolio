import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("nav");
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-neon-cyan focus:px-4 focus:py-2 focus:font-medium focus:text-night-950"
    >
      {t("skipToContent")}
    </a>
  );
}
