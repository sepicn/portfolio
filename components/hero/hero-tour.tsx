"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { scrollPageTo } from "@/components/smooth-scroll";
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

// The phone overview and the desktop room poster, served through one <picture>.
const posterBase = { alt: "", fill: true, sizes: "100vw" } as const;
const phonePoster = getImageProps({
  ...posterBase,
  src: "/images/tour/overview.webp",
}).props;
const desktopPoster = getImageProps({
  ...posterBase,
  src: "/images/room-poster.webp",
}).props;

/**
 * Label nudges on the phone overview, in % of the still. The projected point of the neon
 * sign sits on its lettering, so the Services label goes just under the sign instead.
 */
const PIN_NUDGE: Record<string, { x?: number; y?: number }> = { services: { y: 10.5 } };
/** Vertical centre (% of the screen) of each object in its close-up, for the target lock. */
const LOCK_Y: Record<string, number> = { cv: 45 };

/** Labels above this line (% of the still) sit under the intro text on the first screen. */
const LATE_PIN_Y = 55;
const pinAt = (id: string) => ({
  x: tourViews[id].x + (PIN_NUDGE[id]?.x ?? 0),
  y: tourViews[id].y + (PIN_NUDGE[id]?.y ?? 0),
});
/** Frames per flight in /images/tour/fly/<spot>/00.webp to 47.webp (see build_room.py). */
const FLY_FRAMES = 48;
/**
 * Size the 540x960 frames are decoded to. Each decoded frame lives in memory while its
 * flight is near, so this keeps two flights of 48 frames around 130 MB on a phone.
 */
const DECODE_SIZE = {
  resizeWidth: 432,
  resizeHeight: 768,
  resizeQuality: "medium",
} as const;
/** Flights held decoded at once: the one playing and the next. */
const DECODED_FLIGHTS = 2;

const frameUrl = (spot: string, frame: number) =>
  `/images/tour/fly/${spot}/${String(frame).padStart(2, "0")}.webp`;

/** Each flight's compressed frames, fetched once (about 20 KB each). */
const fetched = new Map<string, Promise<Blob | null>[]>();
function fetchFlight(spot: string) {
  let blobs = fetched.get(spot);
  if (!blobs) {
    blobs = Array.from({ length: FLY_FRAMES }, (_, i) =>
      fetch(frameUrl(spot, i)).then(
        (res) => (res.ok ? res.blob() : null),
        () => null,
      ),
    );
    fetched.set(spot, blobs);
  }
  return blobs;
}

/**
 * Decoded frames of the nearest flights, filled in as they decode (null until then).
 * ImageBitmaps decode off the main thread and stay decoded: an <img> kept only in memory
 * could be evicted by the browser and decoded again mid-scroll, which read as stutter.
 */
const decodedFlights = new Map<string, (ImageBitmap | null)[]>();
function decodeFlight(spot: string) {
  const held = decodedFlights.get(spot);
  if (held) {
    // Most recently used goes last, so the eviction below drops the one furthest behind.
    decodedFlights.delete(spot);
    decodedFlights.set(spot, held);
    return held;
  }
  const frames: (ImageBitmap | null)[] = Array(FLY_FRAMES).fill(null);
  decodedFlights.set(spot, frames);
  while (decodedFlights.size > DECODED_FLIGHTS) {
    const [oldest, list] = decodedFlights.entries().next().value!;
    list.forEach((bitmap) => bitmap?.close());
    decodedFlights.delete(oldest);
  }
  fetchFlight(spot).forEach((blob, i) =>
    blob
      .then((b) =>
        b && decodedFlights.get(spot) === frames
          ? // Older Safari has no resize options; the full size frame works there too.
            createImageBitmap(b, DECODE_SIZE).catch(() => createImageBitmap(b))
          : null,
      )
      .then((bitmap) => {
        if (!bitmap) return;
        if (decodedFlights.get(spot) === frames) frames[i] = bitmap;
        else bitmap.close(); // evicted while decoding
      })
      .catch(() => undefined),
  );
  return frames;
}

/** Draws a frame like object-fit: cover, centred, so it lines up with the overview still. */
function drawCover(ctx: CanvasRenderingContext2D, img: ImageBitmap) {
  const { width: cw, height: ch } = ctx.canvas;
  const scale = Math.max(cw / img.width, ch / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
}

const stops = tourOrder
  .map((id) => hotspots.find((spot) => spot.id === id))
  .filter((spot): spot is (typeof hotspots)[number] => Boolean(spot?.href));

type Props = {
  overlay?: React.ReactNode;
  /** False while Hero3D has not picked a hero yet: render the static first screen only. */
  enabled?: boolean;
};

/**
 * Phone version of the room, as a scroll-driven fly-through. It starts on a wide shot of the
 * room with a named label on each object; each stop plays a camera flight rendered in
 * Blender towards one object (a frame sequence drawn to a canvas, scrubbed by scroll), settles
 * on a sharp close-up from that same camera with a card linking to the page, then flies back
 * out to the room before the next one. Tapping a label flies to that object instead of
 * leaving the page, so the visitor sees what it is first; the card there opens the page.
 *
 * It is also what the server renders before the client picks a hero (`enabled` false): the
 * first screen of the tour below md and the pinned room's poster from md up, laid out by
 * CSS alone. Hero3D keeps this same component when it settles on the tour, so the poster
 * <img> that is the LCP element stays the same DOM node instead of being replaced by a new
 * one after hydration (which made LCP wait for JavaScript).
 */
export function HeroTour({ overlay, enabled = true }: Props) {
  const t = useTranslations("tour");
  const labels = useTranslations("hotspots");
  const outer = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const tour = useRef<{
    start: number;
    end: number;
    units: number;
    tl: gsap.core.Timeline;
  } | null>(null);
  const [active, setActive] = useState(-1);
  // The close-up stills and the first flight wait for the visitor to start moving: someone
  // who only reads the first screen never downloads ~1 MB of frames they would not see.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    // Real input only: "scroll" also fires when ScrollTrigger pins and restores the
    // position on load, which would start the download before anyone touched the page.
    const events = ["touchstart", "pointerdown", "wheel", "keydown"];
    const go = () => setWarm(true);
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    // The first touch is usually the scroll itself, so waiting for it left the first flight
    // playing from the handful of frames that had arrived. Fetch (not decode) that flight
    // once the page is idle after load, unless the visitor asked to save data.
    const saveData = (navigator as { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    let idle = 0;
    const prefetch = () => {
      idle = window.setTimeout(() => fetchFlight(stops[0].id), 1500);
    };
    if (!saveData) {
      if (document.readyState === "complete") prefetch();
      else window.addEventListener("load", prefetch, { once: true });
    }
    return () => {
      events.forEach((e) => window.removeEventListener(e, go));
      window.removeEventListener("load", prefetch);
      window.clearTimeout(idle);
    };
  }, [enabled]);
  useEffect(() => {
    if (warm) decodeFlight(stops[0].id);
  }, [warm]);

  /** Jumps to the wide shot just before stop i, then glides through its flight to the close-up. */
  const flyTo = (event: React.MouseEvent, i: number) => {
    const at = tour.current;
    if (!at) return; // not set up yet: the link simply navigates
    event.preventDefault();
    setWarm(true);
    decodeFlight(stops[i].id);
    const y = (unit: number) => at.start + (unit / at.units) * (at.end - at.start);
    // Settle on the wide shot before stop i at once (it looks the same as the room now),
    // then move the scroll to the close-up and let the scrub play the flight. A smooth
    // scroll instead passed through the other stops, and snap could land on the next one.
    scrollPageTo(y(i * 2));
    at.tl.progress((i * 2) / at.units);
    window.setTimeout(() => scrollPageTo(y(i * 2 + 1)), 60);
  };

  useGSAP(
    () => {
      if (!enabled) return;
      // The section is held by CSS sticky inside the tall outer div, not by a ScrollTrigger
      // pin. A pin swaps to position: fixed from JavaScript, which on a phone lands a frame
      // after the native touch scroll and read as the room jumping as the tour started.
      const el = section.current;
      const wrap = outer.current;
      const intro = el?.querySelector<HTMLElement>("[data-intro]");
      const canvas = el?.querySelector<HTMLCanvasElement>("canvas");
      const ctx = canvas?.getContext("2d");
      if (!el || !wrap || !intro || !canvas || !ctx) return;
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

      const nearest = (frames: (ImageBitmap | null)[], from: number) => {
        for (let i = from; i >= 0; i--) if (frames[i]) return frames[i];
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
        const frames = decodeFlight(spot.id);
        // Blend the two frames either side of the scroll position, so 48 renders read as
        // continuous motion instead of steps. Until a frame is decoded, the nearest earlier
        // one stands in, so a slow network shows a coarser flight rather than a stall.
        const lo = Math.floor(fly.frame);
        const base = nearest(frames, lo);
        // Nothing decoded yet: forget the key so the next tick tries again.
        if (!base) {
          drawn = "";
          return;
        }
        drawCover(ctx, base);
        const next = frames[Math.min(lo + 1, FLY_FRAMES - 1)];
        const mix = fly.frame - lo;
        if (mix > 0.03 && next && next !== base) {
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
      const closeUps = stops.map((_, i) => (i * 2 + 1) / units);
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top+=64",
          // The scroll the sticky section stays held for (the outer div's extra height).
          end: () => `+=${wrap.offsetHeight - el.offsetHeight}`,
          // Short catch-up: a longer one left the flight trailing the finger by a second.
          scrub: 0.4,
          snap: {
            // Settle on a close-up only when the scroll already stopped near one. Snapping
            // to every stop turned a small scroll into the page flying a whole stop on its
            // own; anywhere else the tour simply stays where the finger left it.
            snapTo: (value: number) => {
              const near = closeUps.reduce((a, b) =>
                Math.abs(b - value) < Math.abs(a - value) ? b : a,
              );
              return Math.abs(near - value) * units < 0.3 ? near : value;
            },
            // Wait for the fling to settle before gliding in, instead of fighting it.
            delay: 0.25,
            duration: { min: 0.2, max: 0.5 },
            ease: "power2.inOut",
            // Snap to the stop nearest to where the scroll ends, not where its velocity
            // points: a tap on a label jumps the scroll in one step, and with inertia that
            // jump read as a fling and snapped one stop past the tapped object.
            inertia: false,
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
            // Fetch the next flight while this one plays, and decode it once this one is
            // on its close-up, so only two flights are ever held decoded.
            const current = Math.min(stops.length - 1, Math.floor(at / 2));
            const next = stops[current + 1];
            if (next) {
              fetchFlight(next.id);
              if (at - current * 2 > 1) decodeFlight(next.id);
            }
          },
        },
        onUpdate: draw,
      });

      tl.to(intro, { autoAlpha: 0, y: -24, duration: 0.4 }, 0);
      const late = gsap.utils.toArray<HTMLElement>("[data-late]", el);
      if (late.length) tl.to(late, { autoAlpha: 1, duration: 0.2 }, 0.3);
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

      const trigger = tl.scrollTrigger!;
      const remember = () => {
        tour.current = { start: trigger.start, end: trigger.end, units, tl };
      };
      remember();
      trigger.vars.onRefresh = remember;

      return () => {
        tour.current = null;
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: outer, dependencies: [enabled] },
  );

  // Before the client decides (enabled false) the md-and-up classes lay this out like the
  // pinned room's first screen: 180vh tall with a sticky poster.
  const pending = !enabled;

  return (
    <div
      ref={outer}
      className={pending ? "relative md:h-[180vh]" : "relative"}
      // Enabled: the screen plus 1.1 screens of scroll per stop, in svh so the address bar
      // sliding in and out never changes the length of the tour mid-scroll.
      style={
        pending ? undefined : { height: `calc(100svh - 4rem + ${stops.length * 110}svh)` }
      }
    >
      <div
        ref={section}
        className={`h-[calc(100svh-4rem)] w-full overflow-hidden bg-night-950 ${pending ? "relative md:sticky md:top-16 md:h-[calc(100dvh-4rem)]" : "sticky top-16"}`}
      >
        {/* Sized to the still's aspect ratio, so the label percentages match the render. */}
        <div
          data-room
          className={`absolute top-1/2 left-1/2 aspect-[9/16] h-full min-w-full -translate-x-1/2 -translate-y-1/2 ${pending ? "md:inset-0 md:aspect-auto md:size-full md:min-w-0 md:translate-x-0 md:translate-y-0" : ""}`}
        >
          {/* One <picture> for both posters, so each screen size downloads only its own. */}
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={phonePoster.srcSet}
              sizes="100vw"
            />
            <img
              {...desktopPoster}
              alt=""
              fetchPriority="high"
              loading="eager"
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
          </picture>
          {/* Named, tappable labels on the wide shot. A tap flies to the object first. */}
          <ul data-pins className="absolute inset-0 m-0 list-none p-0 md:hidden">
            {stops
              .filter((spot) => {
                const p = pinAt(spot.id);
                return p.x > 6 && p.x < 94 && p.y > 20 && p.y < 90;
              })
              .map((spot) => (
                <li
                  key={spot.id}
                  // Labels high enough to sit under the intro text and buttons wait until
                  // the intro has faded (see the timeline), so the first screen stays clean.
                  data-late={pinAt(spot.id).y < LATE_PIN_Y || undefined}
                  className={`absolute ${pinAt(spot.id).y < LATE_PIN_Y ? "invisible opacity-0" : ""}`}
                  style={{ left: `${pinAt(spot.id).x}%`, top: `${pinAt(spot.id).y}%` }}
                >
                  <Link
                    href={spot.href!}
                    onClick={(event) => flyTo(event, stops.indexOf(spot))}
                    className="flex min-h-7 -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-neon-cyan/50 bg-night-950/85 py-1 pr-3 pl-1.5 font-mono text-xs tracking-widest text-neon-cyan uppercase"
                  >
                    <span className="block size-2 animate-pulse rounded-full bg-neon-cyan shadow-neon-cyan" />
                    {labels(spot.id)}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {enabled ? (
          <canvas
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full"
          />
        ) : null}

        {(enabled ? stops : []).map((spot, i) => (
          <div
            key={spot.id}
            data-shot
            className="pointer-events-none invisible absolute inset-0 opacity-0"
          >
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
                  className={`absolute inset-0 size-full object-cover mix-blend-screen [filter:drop-shadow(0_0_6px_rgba(0,229,255,0.9))_drop-shadow(0_0_18px_rgba(0,229,255,0.5))] ${i === active ? "animate-tube-on" : "opacity-0"}`}
                />
                {/* Cyan halo behind the object while the tour rests on it. */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(0,229,255,0.28),transparent_60%)] mix-blend-screen transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              </>
            ) : null}
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-night-950 via-night-950/70 to-transparent md:hidden" />

        <div data-intro className="absolute inset-x-0 top-0 z-10 md:bottom-0">
          <div className="bg-gradient-to-b from-night-950 via-night-950/80 to-transparent pb-16 md:h-full md:bg-none md:pb-0">
            <div className="pointer-events-none relative min-h-40 md:h-full">
              {overlay}
            </div>
          </div>
        </div>
        {enabled ? <TourChrome active={active} labels={labels} t={t} /> : null}
      </div>
    </div>
  );
}

type Translator = ReturnType<typeof useTranslations>;

/** Scroll hint, stop dots and the card for the stop the tour rests on. */
function TourChrome({
  active,
  labels,
  t,
}: {
  active: number;
  labels: Translator;
  t: Translator;
}) {
  return (
    <>
      <p
        className={`pointer-events-none absolute inset-x-0 bottom-6 z-10 text-center font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase transition-opacity duration-300 ${active < 0 ? "opacity-100" : "opacity-0"}`}
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

      {/* Target lock on the object the close-up is about: neon corners close in around the
          middle of the frame and its name lights up above them. Keyed by stop, so the
          animation replays at every stop. */}
      {active >= 0 ? (
        <div
          key={active}
          aria-hidden="true"
          className="tour-lock pointer-events-none absolute left-1/2 z-10 h-[34%] w-[78%] -translate-x-1/2 -translate-y-1/2"

          style={{ top: `${LOCK_Y[stops[active].id] ?? 52}%` }}
        >
          <span className="tour-lock-corner top-0 left-0 border-t-2 border-l-2" />
          <span className="tour-lock-corner top-0 right-0 border-t-2 border-r-2" />
          <span className="tour-lock-corner bottom-0 left-0 border-b-2 border-l-2" />
          <span className="tour-lock-corner right-0 bottom-0 border-r-2 border-b-2" />
          <span className="tour-lock-label absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full bg-neon-cyan notch px-3 py-1 font-mono text-xs font-semibold tracking-[0.25em] whitespace-nowrap text-night-950 uppercase [--n:6px]">
            {labels(stops[active].id)}
          </span>
        </div>
      ) : null}

      <div className="absolute inset-x-4 bottom-24 z-10">
        {stops.map((spot, i) => (
          <Link
            key={spot.id}
            href={spot.href!}
            className={`absolute inset-x-0 bottom-0 block rounded-2xl border border-neon-cyan/30 bg-night-950/90 p-4 shadow-neon-cyan transition duration-300 ${i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100"}`}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-neon-pink uppercase">
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
    </>
  );
}
