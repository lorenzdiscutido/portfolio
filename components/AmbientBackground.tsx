/**
 * Fixed, full-viewport "live" background: a dot-matrix grid with slowly
 * drifting blue and orange glows. Pure CSS (no client JS) and transform-only
 * animations, so it stays cheap to render. Motion is disabled automatically
 * for users who prefer reduced motion (`motion-safe:` variants).
 */
export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] overflow-hidden bg-base pointer-events-none"
    >
      {/* Dot matrix grid with a gentle breathing pulse */}
      <div className="absolute inset-0 bg-dot-pattern motion-safe:animate-grid-pulse" />

      {/* Blue glow (starts top-left, wanders toward center) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full bg-blue/15 blur-[120px] will-change-transform motion-safe:animate-drift-a" />

      {/* Orange glow (starts bottom-right, wanders up and left) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full bg-orange/[0.12] blur-[120px] will-change-transform motion-safe:animate-drift-b" />

      {/* Smaller blue accent that drifts through the middle for depth */}
      <div className="absolute top-[35%] right-[15%] w-[320px] h-[320px] rounded-full bg-blue/10 blur-[100px] will-change-transform motion-safe:animate-drift-c" />
    </div>
  );
}
