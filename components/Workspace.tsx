export default function Workspace() {
  return (
    <section id="workspace" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-neonPink dark:text-chartreuse font-mono font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">
            Off-Duty Mechanics
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Beyond the <span className="text-neonPink dark:text-chartreuse">Screen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-2xl p-8 rounded-2xl hover:border-neonPink dark:hover:border-chartreuse transition-all duration-300">
            <h3 className="text-slate-900 dark:text-white text-2xl font-bold mb-4">
              The Hardware Loadout
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              My personal workstation follows a strict, low-profile philosophy: an all-black, zero-RGB hardware build engineered for silence, thermal efficiency, and distraction-free focus. Built to handle sustained multi-container workloads, virtualized network nodes, and local database clusters, every component is selected purely for reliability and throughput rather than visual flash.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-2xl p-8 rounded-2xl hover:border-neonPink dark:hover:border-chartreuse transition-all duration-300">
            <h3 className="text-slate-900 dark:text-white text-2xl font-bold mb-4">
              System Mechanics &amp; Analytics
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Off-duty, I gravitate toward dissecting complex combat systems in action RPGs like Zenless Zone Zero—analyzing core skill passives, attribute anomaly buildup, frame windows, and team rotation synergies. Theorycrafting optimal squad compositions and resource loops exercises the exact same analytical mindset required to eliminate bottlenecks and tune high-efficiency enterprise workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
