export default function Workspace() {
  return (
    <section id="workspace" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-[#0052FF] font-mono font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">
            Off-Duty Mechanics
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Beyond the <span className="text-[#0052FF]">Screen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none p-8 rounded-2xl hover:border-[#0052FF]/50 transition-colors duration-200">
            <h3 className="text-primary text-2xl font-bold mb-4 font-sans">
              The Hardware Loadout
            </h3>
            <p className="text-muted leading-relaxed font-sans">
              My personal workstation follows a strict, low-profile philosophy: an all-black, zero-RGB hardware build engineered for silence, thermal efficiency, and distraction-free focus. Built to handle sustained multi-container workloads, virtualized network nodes, and local database clusters, every component is selected purely for reliability and throughput rather than visual flash.
            </p>
          </div>

          <div className="bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none p-8 rounded-2xl hover:border-[#0052FF]/50 transition-colors duration-200">
            <h3 className="text-primary text-2xl font-bold mb-4 font-sans">
              System Mechanics &amp; Analytics
            </h3>
            <p className="text-muted leading-relaxed font-sans">
              Off-duty, I gravitate toward dissecting complex combat systems in action RPGs like Zenless Zone Zero—analyzing core skill passives, attribute anomaly buildup, frame windows, and team rotation synergies. Theorycrafting optimal squad compositions and resource loops exercises the exact same analytical mindset required to eliminate bottlenecks and tune high-efficiency enterprise workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
