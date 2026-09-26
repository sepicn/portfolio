/**
 * Section divider: a striped synthwave sun sinking into a grid that keeps rolling towards
 * the viewer. CSS only; the grid stops under reduced motion.
 */
export function NeonHorizon({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-44 overflow-hidden ${className}`}>
      <div className="absolute top-6 left-1/2 size-44 -translate-x-1/2 animate-glow rounded-full bg-gradient-to-b from-neon-yellow via-neon-sun to-neon-pink [mask-image:repeating-linear-gradient(to_bottom,#000_0_12px,transparent_12px_17px)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 origin-bottom [transform:perspective(260px)_rotateX(58deg)] animate-grid grid-floor" />
      <div className="absolute inset-x-0 bottom-[6.5rem] h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent shadow-neon-pink" />
    </div>
  );
}
