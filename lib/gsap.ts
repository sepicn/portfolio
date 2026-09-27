import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Loaded = { gsap: typeof Gsap; ScrollTrigger: typeof ScrollTriggerType };

let loading: Promise<Loaded> | null = null;

/**
 * GSAP and ScrollTrigger, fetched after hydration instead of shipped in every page's first
 * bundle. The scroll effects that use this only touch content below the fold (or add
 * smoothing), so nothing visible waits for it. One shared promise, plugin registered once.
 */
export function loadGsap(): Promise<Loaded> {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([core, plugin]) => {
      core.gsap.registerPlugin(plugin.ScrollTrigger);
      return { gsap: core.gsap, ScrollTrigger: plugin.ScrollTrigger };
    },
  );
  return loading;
}
