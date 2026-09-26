"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { hotspots, tourOrder, tourViews } from "@/lib/hotspots";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Width over height of the tour stills in /images/tour (rendered at 1080x1920). */
const STILL_RATIO = 9 / 16;
/** How far the overview pushes in before the close-up still takes over. */
const PUSH = 2.6;

const stops = tourOrder
  .map((id) => hotspots.find((spot) => spot.id === id))
  .filter((spot): spot is (typeof hotspots)[number] => Boolean(spot?.href));

type Props = { overlay?: React.ReactNode };

/**
 * Phone version of the room, as a scroll-driven fly-through. It starts on a wide shot of the
 * room; each stop pushes the camera towards one object and cross-fades into a sharp close-up
 * rendered in Blender from the same camera the desktop scene flies to, holds with a card that
 * links to the page, then pulls back out to the room before the next one. Zooming real
 * renders instead of cropping one image keeps every frame sharp on high-density screens.
 */
export function HeroTour({ overlay }: Props) {
  const t = useTranslations("tour");
  const labels = useTranslations("hotspots");
  const outer = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      // Pin an inner node: ScrollTrigger wraps what it pins in a spacer div, which React
      // cannot unmount cleanly if it owns that node directly (see SlideDeck).
      const el = section.current;
      const room = el?.querySelector<HTMLElement>("[data-room]");
      const intro = el?.querySelector<HTMLElement>("[data-intro]");
      if (!el || !room || !intro) return;
      const shots = gsap.utils.toArray<HTMLElement>("[data-shot]", el);
      const pins = el.querySelector<HTMLElement>("[data-pins]");

      // Each stop takes two timeline units: push in and hold (0 to 1), pull out (1 to 2).
      const units = stops.length * 2;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el,
          start: "top top+=64",
          end: () => `+=${stops.length * window.innerHeight * 1.1}`,
          pin: true,
          scrub: 0.6,
          snap: {
            // Rest on the overview, on each close-up, and on the overview at the end.
            snapTo: [0, ...stops.map((_, i) => (i * 2 + 1) / units), 1],
            duration: { min: 0.25, max: 0.7 },
            ease: "power1.inOut",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const at = self.progress * units;
            const i = Math.round((at - 1) / 2);
            setActive(Math.abs(at - (i * 2 + 1)) < 0.45 ? i : -1);
          },
        },
      });

      tl.to(intro, { autoAlpha: 0, y: -24, duration: 0.4 }, 0);
      stops.forEach((spot, i) => {
        const at = i * 2;
        const point = tourViews[spot.id];
        const shot = shots[i];
        // Scale is 1 at this moment, so moving the origin does not jump.
        tl.set(room, { transformOrigin: `${point.x}% ${point.y}%` }, at);
        tl.to(room, { scale: PUSH, duration: 0.7, ease: "power2.in" }, at);
        if (pins) tl.to(pins, { autoAlpha: 0, duration: 0.25 }, at);
        tl.fromTo(
          shot,
          { autoAlpha: 0, scale: 1.3 },
          { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out" },
          at + 0.4,
        );
        // Hold until at + 1.2, then pull back out to the room.
        tl.to(
          shot,
          { autoAlpha: 0, scale: 1.3, duration: 0.5, ease: "power2.in" },
          at + 1.2,
        );
        tl.to(room, { scale: 1, duration: 0.7, ease: "power2.out" }, at + 1.3);
        if (pins) tl.to(pins, { autoAlpha: 1, duration: 0.3 }, at + 1.7);
      });
    },
    { scope: outer },
  );

  return (
    <div ref={outer}>
      <div
        ref={section}
        className="relative h-[calc(100svh-4rem)] w-full overflow-hidden bg-night-950"
      >
        {/* Sized to the still's aspect ratio so transform-origin percentages match the render. */}
        <div
          data-room
          className="absolute top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ aspectRatio: `${STILL_RATIO}`, minWidth: "100%" }}
        >
          <Image
            src="/images/tour/overview.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Named, tappable labels on the wide shot, so every object says what it opens. */}
          <ul data-pins className="absolute inset-0 m-0 list-none p-0">
            {stops
              .filter((spot) => {
                const p = tourViews[spot.id];
                return p.x > 6 && p.x < 94 && p.y > 20 && p.y < 90;
              })
              .map((spot) => (
                <li
                  key={spot.id}
                  className="absolute"
                  style={{
                    left: `${tourViews[spot.id].x}%`,
                    top: `${tourViews[spot.id].y}%`,
                  }}
                >
                  <Link
                    href={spot.href!}
                    className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-neon-cyan/50 bg-night-950/80 py-1 pr-3 pl-1.5 font-mono text-[10px] tracking-widest text-neon-cyan uppercase backdrop-blur"
                  >
                    <span className="block size-2 animate-pulse rounded-full bg-neon-cyan shadow-neon-cyan" />
                    {labels(spot.id)}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {stops.map((spot) => (
          <div
            key={spot.id}
            data-shot
            className="invisible absolute inset-0 opacity-0 will-change-transform"
          >
            <Image
              src={`/images/tour/${spot.id}.webp`}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-night-950 via-night-950/70 to-transparent" />

        <div data-intro className="absolute inset-x-0 top-0 z-10">
          <div className="bg-gradient-to-b from-night-950 via-night-950/80 to-transparent pb-16">
            <div className="relative min-h-40">{overlay}</div>
          </div>
        </div>
        <p
          className={`pointer-events-none absolute inset-x-0 bottom-6 z-10 text-center font-mono text-[11px] tracking-[0.3em] text-neon-cyan uppercase transition-opacity duration-300 ${active < 0 ? "opacity-100" : "opacity-0"}`}
        >
          {t("hint")} &darr;
        </p>

        <ol
          className="absolute top-1/2 right-3 z-10 -translate-y-1/2 space-y-2"
          aria-hidden="true"
        >
          {stops.map((spot, i) => (
            <li
              key={spot.id}
              className={`block size-1.5 rounded-full transition ${i === active ? "scale-150 bg-neon-pink shadow-neon-pink" : "bg-white/25"}`}
            />
          ))}
        </ol>

        <div className="absolute inset-x-4 bottom-5 z-10">
          {stops.map((spot, i) => (
            <Link
              key={spot.id}
              href={spot.href!}
              className={`absolute inset-x-0 bottom-0 block rounded-2xl border border-neon-cyan/30 bg-night-950/85 p-4 shadow-neon-cyan backdrop-blur transition duration-300 ${i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
              inert={i !== active}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-neon-pink uppercase">
                {String(i + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
              </p>
              <div className="mt-1 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-2xl font-semibold text-ink-100">
                    {labels(spot.id)}
                  </p>
                  <p className="mt-1 text-sm text-ink-200">{t(`desc.${spot.id}`)}</p>
                </div>
                <span className="shrink-0 rounded-md bg-neon-cyan px-4 py-2.5 text-sm font-medium text-night-950 shadow-neon-cyan">
                  {t("open")} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
