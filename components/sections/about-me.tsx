import Image from "next/image";
import { home } from "@/content/data/home";
import { pick, pickList } from "@/content/i18n";
import { profile } from "@/content/data/profile";

export function AboutMe({ locale }: { locale: string }) {
  return (
    <div
      data-reveal
      className="grid items-center gap-7 lg:grid-cols-[1fr_1.2fr] lg:gap-14"
    >
      <figure data-reveal="tilt" className="relative border border-ink bg-paper p-3.5">
        <Image
          src={profile.photo}
          alt={profile.name}
          width={800}
          height={1000}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="aspect-[4/5] w-full object-cover grayscale"
        />
        <figcaption className="absolute bottom-7 left-7 bg-bg px-2 py-1 font-mono text-[12px]">
          {pick(home.photoCaption, locale)}
        </figcaption>
      </figure>
      <div className="border border-rule bg-paper px-5 py-7 lg:px-10 lg:py-10">
        <p className="tag">{pick(home.meTag, locale)}</p>
        <h2 className="mt-3 text-display">{pick(home.meTitle, locale)}</h2>
        <p className="mt-5 max-w-[40ch] text-[clamp(19px,1.6vw,23px)] leading-[1.55] text-ink">
          {pick(home.meBody, locale)}
        </p>
        <p className="mt-4 max-w-[40ch] text-[clamp(19px,1.6vw,23px)] leading-[1.55] text-ink">
          {pick(home.meLanguages, locale)}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {pickList(home.meTags, locale).map((tag) => (
            <li key={tag} className="border border-rule bg-paper px-3.5 py-2 text-[15px]">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
