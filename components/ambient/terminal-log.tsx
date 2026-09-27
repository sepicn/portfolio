import { CyberFrame } from "@/components/cyber-frame";

type Props = { lines: string[]; title?: string; className?: string };

/**
 * A small terminal whose log scrolls forever, like a `tail -f` of the week's work.
 * The list is rendered twice and moved by half its height, so the loop is seamless.
 */
export function TerminalLog({ lines, title = "~/sepic.me", className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`[filter:drop-shadow(0_0_14px_rgba(0,229,255,0.35))] ${className}`}
    >
      <CyberFrame variant={7} tone="cyan" className="overflow-hidden bg-night-950">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-neon-red/80" />
          <span className="size-2.5 rounded-full bg-neon-yellow/80" />
          <span className="size-2.5 rounded-full bg-neon-green/80" />
          <span className="ml-2 font-mono text-[11px] text-ink-400">{title}</span>
        </div>
        <div className="relative h-52 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]">
          <ul className="animate-terminal space-y-2 px-4 py-3 font-mono text-[12px] leading-relaxed">
            {[...lines, ...lines].map((line, i) => (
              <li
                key={i}
                className={line.startsWith(">") ? "text-neon-cyan" : "text-ink-300"}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-white/10 px-4 py-2 font-mono text-[12px] text-neon-pink">
          $ <span className="animate-blink">▍</span>
        </div>
      </CyberFrame>
    </div>
  );
}
