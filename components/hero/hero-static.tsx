import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { hotspots, roomViews } from "@/lib/hotspots";

/**
 * Static version of the room for phones, reduced motion and browsers without WebGL.
 * Same hotspots, same routes, rendered as plain links on top of the Blender render.
 */
export function HeroStatic() {
  const t = useTranslations("hotspots");

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5">
      <Image
        src="/images/room-preview.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />
      <ul className="absolute inset-0 m-0 list-none p-0">
        {hotspots
          .filter((spot) => spot.href)
          .map((spot) => (
            <li
              key={spot.id}
              className="absolute"
              style={{
                left: `${roomViews[spot.id].x}%`,
                top: `${roomViews[spot.id].y}%`,
              }}
            >
              <Link
                href={spot.href!}
                className="group flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
              >
                <span className="block size-3 rounded-full bg-neon-cyan shadow-neon-cyan ring-4 ring-neon-cyan/20 transition group-hover:scale-125" />
                <span className="rounded-md border border-neon-cyan/40 bg-night-950/85 px-2 py-0.5 font-mono text-[10px] tracking-widest text-neon-cyan uppercase">
                  {t(spot.id)}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
