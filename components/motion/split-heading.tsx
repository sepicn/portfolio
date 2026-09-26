"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Glow the last word in neon pink. */
  accentLast?: boolean;
};

/**
 * Splits a heading into words and lets each one rise into place with a slight rotation,
 * staggered, when the heading scrolls into view. No plugin needed for word-level splits.
 */
export function SplitHeading({
  text,
  as = "h2",
  className = "",
  accentLast = false,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-word]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { y: 0, rotateX: 0, autoAlpha: 1 });
      return;
    }
    const tween = gsap.fromTo(
      targets,
      { y: "110%", rotateX: -40, autoAlpha: 0 },
      {
        y: "0%",
        rotateX: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          aria-hidden="true"
        >
          <span
            data-word
            className={`inline-block will-change-transform ${accentLast && i === words.length - 1 ? "text-neon-pink text-glow-pink" : ""}`}
            data-reveal
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
