"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
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

type Mode = "pending" | "webgl" | "tour" | "static";

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
  return gl ? "webgl" : "static";
}

type HeroProps = { overlay?: React.ReactNode };

const INTENT_EVENTS = [
  "pointermove",
  "pointerdown",
  "wheel",
  "keydown",
  "touchstart",
  "scroll",
];

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
      <PinnedRoom overlay={overlay} />
    </SceneProvider>
  );
}

function PinnedRoom({ overlay }: HeroProps) {
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

  return (
    <div ref={sectionRef} className="relative h-[180vh]">
      <div className="sticky top-16 h-[calc(100dvh-4rem)] w-full overflow-hidden">
        {mountScene ? <RoomCanvas onReady={onReady} /> : null}
        <Image
          src="/images/room-preview.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`pointer-events-none object-cover transition-opacity duration-700 ${
            sceneReady ? "opacity-0" : "opacity-100"
          }`}
        />
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
