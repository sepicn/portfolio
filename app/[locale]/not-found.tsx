import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/page-intro";

export default function NotFoundPage() {
  const t = useTranslations("notFound");
  return (
    <PageIntro title={t("title")} intro={t("body")}>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md border border-neon-cyan/60 px-5 py-3 text-neon-cyan"
      >
        {t("back")}
      </Link>
    </PageIntro>
  );
}
