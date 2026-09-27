"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { scrollPageToTop } from "./smooth-scroll";

// Hexagon outline, used for both the dim track and the neon progress stroke.
const HEX = "M28 2L51 15V41L28 54L5 41V15Z";

/**
 * Hexagonal "back to top" button. It appears once the reader is a screen and a half down,
 * and its neon edge fills with scroll progress so it doubles as a reading indicator.
 */
export function BackToTop() {
  const t = useTranslations("footer");
  const [visible, setVisible] = useState(false);
  const progress = useRef<SVGPathElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 1.5);
      progress.current?.style.setProperty(
        "stroke-dashoffset",
        String(1 - (max > 0 ? Math.min(y / max, 1) : 0)),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollPageToTop}
      aria-label={t("backToTop")}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      data-visible={visible || undefined}
      className="back-to-top group fixed right-4 bottom-4 z-40 grid size-14 place-items-center sm:right-6 sm:bottom-6"
    >
      <svg
        viewBox="0 0 56 56"
        fill="none"
        className="absolute inset-0 size-full overflow-visible"
      >
        <path d={HEX} className="fill-night-950/85 stroke-white/15" strokeWidth="1.5" />
        <path
          ref={progress}
          d={HEX}
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          strokeWidth="2"
          strokeLinejoin="round"
          className="stroke-neon-cyan [filter:drop-shadow(0_0_4px_rgba(0,229,255,0.9))]"
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        className="back-to-top-arrow relative size-5 text-neon-cyan"
      >
        <path d="M5 14L12 7L19 14" />
        <path d="M5 20L12 13L19 20" opacity="0.45" />
      </svg>
    </button>
  );
}
