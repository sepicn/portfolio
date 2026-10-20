import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("nav");
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-blue focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-paper"
    >
      {t("skipToContent")}
    </a>
  );
}
