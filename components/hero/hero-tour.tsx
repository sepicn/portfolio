"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { hotspots, tourOrder, tourViews } from "@/lib/hotspots";
import {
  AcademicCapIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  ChevronDoubleDownIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  PhoneIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const icons: Record<string, typeof CodeBracketIcon> = {
  projects: CodeBracketIcon,
  services: SparklesIcon,
  clients: BuildingOffice2Icon,
  about: UserIcon,
  education: AcademicCapIcon,
  cv: DocumentTextIcon,
  contact: PhoneIcon,
};

gsap.registerPlugin(ScrollTrigger, useGSAP);
// The address bar sliding in and out resizes the viewport on every direction change. A
// refresh there re-measures the pin mid-scroll, which read as the tour jumping.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Width over height of the tour stills in /images/tour (rendered at 1080x1920). */
const STILL_RATIO = 9 / 16;
/** Frames per flight in /images/tour/fly/<spot>/00.webp to 23.webp (see build_room.py). */
const FLY_FRAMES = 24;

const frameUrl = (spot: string, frame: number) =>
  `/images/tour/fly/${spot}/${String(frame).padStart(2, "0")}.webp`;

/** Frames whose pixels are decoded, so drawing them never stalls a scroll frame. */
const decoded = new WeakSet<HTMLImageElement>();

/** Loads a flight's frames once, on demand; returns the (possibly still loading) images. */
const flights = new Map<string, HTMLImageElement[]>();
function loadFlight(spot: string) {
  let frames = flights.get(spot);
  if (!frames) {
    frames = Array.from({ length: FLY_FRAMES }, (_, i) => {
      const img = new window.Image();
      img.src = frameUrl(spot, i);
      // Decode off the main thread up front: drawing an undecoded image to a canvas decodes
      // it synchronously, which made the flight hitch the first time through.
      img.decode().then(
        () => decoded.add(img),
        () => undefined,
      );
      return img;
    });
    flights.set(spot, frames);
  }
  return frames;
}

/** Draws an image like object-fit: cover, centred, so it lines up with the overview still. */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const { width: cw, height: ch } = ctx.canvas;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
}

const stops = tourOrder
  .map((id) => hotspots.find((spot) => spot.id === id))
  .filter((spot): spot is (typeof hotspots)[number] => Boolean(spot?.href));

type Props = { overlay?: React.ReactNode };

/**
 * Phone version of the room, as a scroll-driven fly-through. It starts on a wide shot of the
 * room with a named label on each object; each stop plays a camera flight rendered in
 * Blender towards one object (a frame sequence drawn to a canvas, scrubbed by scroll), settles
 * on a sharp close-up from that same camera with a card linking to the page, then flies back
 * out to the room before the next one.
 */
export function HeroTour({ overlay }: Props) {
  const t = useTranslations("tour");
  const labels = useTranslations("hotspots");
  const outer = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  // The close-up stills and the first flight wait for the visitor to start moving: someone
  // who only reads the first screen never downloads ~600 KB of frames they would not see.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    // Real input only: "scroll" also fires when ScrollTrigger pins and restores the
    // position on load, which would start the download before anyone touched the page.
    const events = ["touchstart", "pointerdown", "wheel", "keydown"];
    const go = () => setWarm(true);
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, go));
  }, []);
  useEffect(() => {
    if (warm) loadFlight(stops[0].id);
  }, [warm]);

  useGSAP(
    () => {
      // Pin an inner node: ScrollTrigger wraps what it pins in a spacer div, which React
      // cannot unmount cleanly if it owns that node directly (see SlideDeck).
      const el = section.current;
      const intro = el?.querySelector<HTMLElement>("[data-intro]");
      const canvas = el?.querySelector<HTMLCanvasElement>("canvas");
      const ctx = canvas?.getContext("2d");
      if (!el || !intro || !canvas || !ctx) return;
      const shots = gsap.utils.toArray<HTMLElement>("[data-shot]", el);
      const pins = el.querySelector<HTMLElement>("[data-pins]");

      // The frames are 540x960, so a backing store past 1.5x only costs fill rate.
      const size = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = Math.round(el.clientWidth * dpr);
        const h = Math.round(el.clientHeight * dpr);
        // Setting a canvas size, even the same one, reallocates and clears it.
        if (canvas.width === w && canvas.height === h) return false;
        canvas.width = w;
        canvas.height = h;
        return true;
      };
      size();

      const nearest = (frames: HTMLImageElement[], from: number) => {
        for (let i = from; i >= 0; i--) if (decoded.has(frames[i])) return frames[i];
        return null;
      };

      // Which flight is showing and how far along it is (0 = room, FLY_FRAMES - 1 = close-up).
      const fly = { stop: -1, frame: 0 };
      let drawn = "";
      const draw = () => {
        const spot = stops[fly.stop];
        // Frame 0 is the wide shot, which the still under the canvas already shows. Drawing
        // it would also fetch the whole flight the moment the page loads.
        const on = spot && fly.frame > 0.05;
        // Scrub fires every tick; skip the repaint when nothing visible changed.
        const key = on ? `${fly.stop}:${Math.round(fly.frame * 16)}` : "";
        if (key === drawn) return;
        drawn = key;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!on) return;
        const frames = loadFlight(spot.id);
        // Blend the two frames either side of the scroll position, so 24 renders read as
        // continuous motion instead of steps. Until a frame is decoded, the nearest earlier
        // one stands in, so a slow network shows a coarser flight rather than a stall.
        const lo = Math.floor(fly.frame);
        const base = nearest(frames, lo);
        if (!base) return;
        drawCover(ctx, base);
        const next = frames[Math.min(lo + 1, FLY_FRAMES - 1)];
        const mix = fly.frame - lo;
        if (mix > 0.03 && next !== base && decoded.has(next)) {
          ctx.globalAlpha = mix;
          drawCover(ctx, next);
          ctx.globalAlpha = 1;
        }
      };
      // The first flight loads on the first interaction (see warm); each next one while
      // the current plays. Phones fire resize whenever the address bar slides; the canvas
      // follows the svh-sized section, so that is usually a no-op.
      const onResize = () => {
        if (!size()) return;
        drawn = "";
        draw();
      };
      window.addEventListener("resize", onResize);

      // Each stop takes two timeline units: push in and hold (0 to 1), pull out (1 to 2).
      const units = stops.length * 2;
      let shown = -1;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el,
          start: "top top+=64",
          end: () => `+=${stops.length * window.innerHeight * 1.1}`,
          pin: true,
          // A longer catch-up smooths out the uneven deltas of a finger flick.
          scrub: 1,
          snap: {
            // Rest on the overview, on each close-up, and on the overview at the end.
            snapTo: [0, ...stops.map((_, i) => (i * 2 + 1) / units), 1],
            // Wait for the fling to settle before gliding in, instead of fighting it.
            delay: 0.15,
            duration: { min: 0.4, max: 0.9 },
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const at = self.progress * units;
            const i = Math.round((at - 1) / 2);
            const now = Math.abs(at - (i * 2 + 1)) < 0.45 ? i : -1;
            // Only touch React when the stop changes, not on every scroll tick.
            if (now !== shown) {
              shown = now;
              setActive(now);
            }
            const next = stops[Math.min(stops.length - 1, Math.floor(at / 2) + 1)];
            if (next) loadFlight(next.id);
          },
        },
        onUpdate: draw,
      });

      tl.to(intro, { autoAlpha: 0, y: -24, duration: 0.4 }, 0);
      stops.forEach((spot, i) => {
        const at = i * 2;
        const shot = shots[i];
        // Fly in over 0.8, hold on the close-up, fly back out from 1.2 to 2.
        tl.set(fly, { stop: i, frame: 0 }, at);
        if (pins) tl.to(pins, { autoAlpha: 0, duration: 0.15 }, at);
        tl.to(fly, { frame: FLY_FRAMES - 1, duration: 0.8, ease: "none" }, at);
        // The sharp still is the flight's last frame at full resolution: same camera, no cut.
        tl.fromTo(
          shot,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.15, ease: "none" },
          at + 0.8,
        );
        tl.to(shot, { autoAlpha: 0, duration: 0.1, ease: "none" }, at + 1.2);
        tl.to(fly, { frame: 0, duration: 0.8, ease: "none" }, at + 1.2);
        tl.set(fly, { stop: -1 }, at + 2);
        if (pins) tl.to(pins, { autoAlpha: 1, duration: 0.2 }, at + 1.8);
      });

      return () => window.removeEventListener("resize", onResize);
    },
    { scope: outer },
  );

  return (
    <div ref={outer}>
      <div
        ref={section}
        className="relative h-[calc(100svh-4rem)] w-full overflow-hidden bg-night-950"
      >
        {/* Sized to the still's aspect ratio, so the label percentages match the render. */}
        <div
          data-room
          className="absolute top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2"
          style={{ aspectRatio: `${STILL_RATIO}`, minWidth: "100%" }}
        >
          <Image
            src="/images/tour/overview.webp"
            alt=""
            fill
            preload
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
                    className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-neon-cyan/50 bg-night-950/85 py-1 pr-3 pl-1.5 font-mono text-[10px] tracking-widest text-neon-cyan uppercase"
                  >
                    <span className="block size-2 animate-pulse rounded-full bg-neon-cyan shadow-neon-cyan" />
                    {labels(spot.id)}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <canvas aria-hidden="true" className="absolute inset-0 size-full" />

        {stops.map((spot, i) => (
          <div key={spot.id} data-shot className="invisible absolute inset-0 opacity-0">
            {warm ? (
              <>
                <Image
                  src={`/images/tour/${spot.id}.webp`}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                {/* A neon trace around the object (blender/render_outlines.py), lit once
                    the tour rests here, so it reads as the thing to tap. */}
                {/* eslint-disable-next-line @next/next/no-img-element -- flat ~20 KB overlay */}
                <img
                  src={`/images/tour/outline/${spot.id}.webp`}
                  alt=""
                  decoding="async"
                  className={`absolute inset-0 size-full object-cover mix-blend-screen ${i === active ? "animate-tube-on" : "opacity-0"}`}
                />
              </>
            ) : null}
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
          <span className="inline-flex items-center gap-2">
            {t("hint")}
            <ChevronDoubleDownIcon aria-hidden="true" className="size-4 animate-bounce" />
          </span>
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
              className={`absolute inset-x-0 bottom-0 block rounded-2xl border border-neon-cyan/30 bg-night-950/90 p-4 shadow-neon-cyan transition duration-300 ${i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100"}`}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-neon-pink uppercase">
                {String(i + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
              </p>
              <div className="mt-1 flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-display text-2xl font-semibold text-ink-100">
                    {(() => {
                      const Icon = icons[spot.id];
                      return Icon ? (
                        <Icon aria-hidden="true" className="size-6 text-neon-cyan" />
                      ) : null;
                    })()}
                    {labels(spot.id)}
                  </p>
                  <p className="mt-1 text-sm text-ink-200">{t(`desc.${spot.id}`)}</p>
                </div>
                <span className="shrink-0 rounded-md bg-neon-cyan px-4 py-2.5 text-sm font-medium text-night-950 shadow-neon-cyan">
                  <span className="inline-flex items-center gap-1.5">
                    {t("open")}
                    <ArrowRightIcon aria-hidden="true" className="size-4" />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
