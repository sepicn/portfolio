import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
    <div className="wrap">
      <div className="border-b border-ink pt-14 pb-10">
        <p className="tag">404</p>
        <h1 className="mt-3.5 text-[clamp(3rem,8vw,9rem)] leading-[0.9] tracking-[-0.05em]">
          {t("title")}
          <span className="text-blue">.</span>
        </h1>
        <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.55] text-ink-2">
          {t("body")}
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          {t("back")} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <p className="label mt-12">{t("game.hint")}</p>
      <PacRunner labels={labels} className="mt-4" />
    </div>
  );
}
