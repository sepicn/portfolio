"use client";

import { scrollPageToTop } from "./smooth-scroll";

export function BackToTopLink({ label }: { label: string }) {
  return (
    <button type="button" onClick={scrollPageToTop} className="hover:text-paper">
      {label} ↑
    </button>
  );
}
