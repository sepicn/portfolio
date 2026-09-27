"use client";

import dynamic from "next/dynamic";
import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { hotspots } from "@/lib/hotspots";
import { SceneProvider, useScene } from "@/components/scene/scene-state";
import { HeroStatic } from "./hero-static";
import { HeroTour } from "./hero-tour";

gsap.registerPlugin(ScrollTrigger);

const RoomCanvas = dynamic(
  () => import("@/components/scene/room-canvas").then((m) => m.RoomCanvas),
  { ssr: false },
);

type Mode = "pending" | "webgl" | "poster" | "tour" | "static";

function detectMode(): Mode {
  if (typeof window === "undefined") return "pending";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Only width decides between phone and desktop behaviour. Touch laptops and tablets
  // report a coarse pointer too, and they have the width and the GPU for the real room.
  const phone = window.innerWidth < 768;
  if (reduce) return "static";
  if (phone) return "tour";
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) return "static";
  // A software rasteriser (no GPU: headless Chrome in CI, some VMs and old office PCs)
  // renders the room at a few frames per second and starves the main thread; there the
  // pinned poster stays and the scene never mounts.
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return /swiftshader|llvmpipe|software|basic render/i.test(renderer)
    ? "poster"
    : "webgl";
}

type HeroProps = { overlay?: React.ReactNode };

// Real input only: "scroll" also fires when ScrollTrigger pins and restores the position
// on load, which mounted three.js before anyone touched the page.
const INTENT_EVENTS = ["pointermove", "pointerdown", "wheel", "keydown", "touchstart"];

/**
 * Resolves once the visitor shows intent or the page has been idle for a while. The
 * three.js bundle and scene compile cost ~1 s of main thread; doing it before anyone
 * touches the page only delays interactivity, and the poster looks the same meanwhile.
 */
function useDeferredMount(idleMs = 4000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer = 0;
    let idle = 0;
    const go = () => setReady(true);
    const onLoad = () => {
      timer = window.setTimeout(() => {
        // Older Safari has no requestIdleCallback.
        if (typeof window.requestIdleCallback === "function") {
          idle = window.requestIdleCallback(go, { timeout: 2000 });
        } else go();
      }, idleMs);
    };
    INTENT_EVENTS.forEach((e) =>
      window.addEventListener(e, go, { once: true, passive: true }),
    );
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => {
      INTENT_EVENTS.forEach((e) => window.removeEventListener(e, go));
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, [idleMs]);

  return ready;
}

export function Hero3D({ overlay }: HeroProps) {
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    // Client-only decision, deferred one tick so hydration matches the server HTML.
    const id = window.requestAnimationFrame(() => setMode(detectMode()));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (mode === "pending") return;
    // The chosen hero has a different height from the placeholder (the pinned room is
    // 180vh, the tour pins its own section), and the slide deck below measured its start
    // before the switch. Without a re-measure it pinned while the room was still on screen.
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [mode]);

  if (mode === "pending") return <HeroPlaceholder overlay={overlay} />;

  if (mode === "tour") return <HeroTour overlay={overlay} />;

  if (mode !== "webgl") {
    return (
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <div className="relative mb-8 min-h-40">{overlay}</div>
        <HeroStatic />
      </div>
    );
  }

  return (
    <SceneProvider>
      <PinnedRoom overlay={overlay} scene={mode === "webgl"} />
    </SceneProvider>
  );
}

/**
 * What the server renders before the client picks a hero: the first screen of the phone
 * tour below md and of the pinned room from md up, laid out by CSS alone. Each matches
 * its hero's geometry, so the swap after hydration moves nothing (no layout shift) and
 * the poster that is the LCP image is in the HTML from the start instead of arriving
 * with JavaScript. A <picture> sends each screen size only its own poster.
 */
function HeroPlaceholder({ overlay }: HeroProps) {
  const common = { alt: "", fill: true, sizes: "100vw" } as const;
  const phone = getImageProps({ ...common, src: "/images/tour/overview.webp" }).props;
  const desktop = getImageProps({ ...common, src: "/images/room-poster.webp" }).props;

  return (
    <div className="relative h-[calc(100svh-4rem)] md:h-[180vh]">
      <div className="relative h-full w-full overflow-hidden bg-night-950 md:sticky md:top-16 md:h-[calc(100dvh-4rem)]">
        <picture>
          <source media="(max-width: 767px)" srcSet={phone.srcSet} sizes={phone.sizes} />
          <img
            {...desktop}
            alt=""
            fetchPriority="high"
            loading="eager"
            className="pointer-events-none absolute inset-0 size-full object-cover"
          />
        </picture>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-night-950 via-night-950/70 to-transparent md:hidden" />
        <div className="absolute inset-x-0 top-0 z-10 md:bottom-0">
          <div className="bg-gradient-to-b from-night-950 via-night-950/80 to-transparent pb-16 md:h-full md:bg-none md:pb-0">
            <div className="pointer-events-none relative min-h-40 md:h-full">
              {overlay}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PinnedRoom({ overlay, scene = true }: HeroProps & { scene?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scroll } = useScene();
  const t = useTranslations("hotspots");
  const mountScene = useDeferredMount();
  const [sceneReady, setSceneReady] = useState(false);
  const onReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scroll.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, [scroll]);

  // Old-TV power-off while the room leaves the screen: the picture closes from top and
  // bottom into a bright line, and the line shrinks to nothing. It runs as the section
  // scrolls out, with the next section already rising underneath. It animates a clip-path
  // and an overlay line, never the WebGL canvas itself: scaling or filtering the canvas
  // dropped frames to black in Chrome.
  const screenRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const screen = screenRef.current;
    const line = lineRef.current;
    if (!section || !screen || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        end: "bottom 40%",
        scrub: 0.3,
      },
    });
    tl.fromTo(
      screen,
      { clipPath: "inset(0% 0% 0% 0%)" },
      { clipPath: "inset(49.6% 0% 49.6% 0%)", duration: 0.6, ease: "power3.in" },
    )
      .fromTo(line, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.45)
      .to(line, { scaleX: 0, duration: 0.3, ease: "power2.in" }, 0.6)
      .to(line, { autoAlpha: 0, duration: 0.05 }, 0.9);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[180vh]">
      <div
        ref={screenRef}
        className="sticky top-16 h-[calc(100dvh-4rem)] w-full overflow-hidden"
      >
        <div
          ref={lineRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute inset-x-0 top-1/2 z-30 h-[3px] -translate-y-1/2 bg-white shadow-[0_0_24px_8px_rgba(0,229,255,0.65)]"
        />
        {scene && mountScene ? <RoomCanvas onReady={onReady} /> : null}
        {/* A capture of this very scene (scripts/poster.mjs), so the fade into WebGL is seamless.
            Wrapped because next/image fill needs a positioned parent, and this one is sticky. */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/room-poster.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className={`pointer-events-none object-cover transition-opacity duration-700 ${
              sceneReady ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10">{overlay}</div>
        {/* Keyboard and screen-reader path: the same hotspots as plain links. */}
        <nav
          aria-label="Room"
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-wrap justify-center gap-2 px-4 md:flex"
        >
          {hotspots
            .filter((spot) => spot.href)
            .map((spot) => (
              <Link
                key={spot.id}
                href={spot.href!}
                className="rounded-full border border-white/10 bg-night-950/70 px-3 py-1 font-mono text-[11px] tracking-widest text-ink-200 uppercase backdrop-blur transition hover:border-neon-cyan/60 hover:text-neon-cyan"
              >
                {t(spot.id)}
              </Link>
            ))}
        </nav>
      </div>
    </div>
  );
}
