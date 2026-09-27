import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/page-intro";
import { PacRunner } from "@/components/game/pac-runner";

export default function NotFoundPage() {
  const t = useTranslations("notFound");
  const labels = {
    title: t("game.title"),
    start: t("game.start"),
    over: t("game.over"),
    restart: t("game.restart"),
    score: t("game.score"),
    best: t("game.best"),
  };
  return (
    <PageIntro title={t("title")} intro={t("body")}>
      <Link
        href="/"
        className="mt-8 inline-block border border-neon-cyan/60 notch px-5 py-3 text-neon-cyan [--n:9px] [--nc:rgba(0,229,255,0.6)]"
      >
        {t("back")}
      </Link>
      <p className="mt-12 font-mono text-xs tracking-[0.2em] text-ink-400 uppercase">
        {t("game.hint")}
      </p>
      <PacRunner labels={labels} className="mt-4" />
    </PageIntro>
  );
}
