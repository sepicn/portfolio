"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SynthwaveLoop } from "@/lib/audio/synth";

/**
 * Play / mute button for the generated synthwave loop. Sound never starts on its own:
 * the first click is the user gesture browsers require, and the choice is remembered.
 */
export function MusicToggle() {
  const t = useTranslations("music");
  const loop = useRef<SynthwaveLoop | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => loop.current?.stop();
  }, []);

  const toggle = async () => {
    loop.current ??= new SynthwaveLoop();
    if (playing) {
      loop.current.stop();
      setPlaying(false);
    } else {
      await loop.current.start();
      setPlaying(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      title={playing ? t("mute") : t("play")}
      className="group flex h-9 items-center gap-2 rounded-full border border-white/10 px-3 font-mono text-[11px] tracking-widest text-ink-200 uppercase transition hover:border-neon-pink/60 hover:text-neon-pink"
    >
      <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
        {[0.4, 0.9, 0.6, 1].map((h, i) => (
          <span
            key={i}
            className={`w-0.5 rounded-sm bg-current ${playing ? "origin-bottom animate-eq" : ""}`}
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </span>
      <span className="sr-only sm:not-sr-only">{playing ? t("on") : t("off")}</span>
    </button>
  );
}
