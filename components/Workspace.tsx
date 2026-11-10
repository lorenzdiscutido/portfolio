import { Cabinet, Rebuild } from "@/components/ui/hairline";

export default function Workspace() {
  return (
    <section id="workspace" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-[#0052FF] dark:text-[#38bdf8] font-mono font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">
            Off-Duty Mechanics
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Beyond the <span className="text-[#0052FF] dark:text-[#38bdf8]">Screen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none p-8 rounded-2xl hover:border-[#0052FF]/50 dark:hover:border-[#38bdf8]/50 transition-colors duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-primary text-2xl font-bold font-sans">
                  The Hardware Loadout
                </h3>
                <div className="w-14 h-14 shrink-0">
                  <Cabinet intensity={0.7} />
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                My personal workstation follows a strict, low-profile philosophy: an all-black, zero-RGB hardware build engineered for silence, thermal efficiency, and distraction-free focus. Built to handle sustained multi-container workloads, virtualized network nodes, and local database clusters, every component is selected purely for reliability and throughput rather than visual flash.
              </p>
            </div>
          </div>

          <div className="bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none p-8 rounded-2xl hover:border-[#0052FF]/50 dark:hover:border-[#38bdf8]/50 transition-colors duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-primary text-2xl font-bold font-sans">
                  System Mechanics &amp; Analytics
                </h3>
                <div className="w-14 h-14 shrink-0">
                  <Rebuild intensity={0.7} />
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                Off-duty, I gravitate toward dissecting complex combat systems in action RPGs like Zenless Zone Zero—analyzing core skill passives, attribute anomaly buildup, frame windows, and team rotation synergies. Theorycrafting optimal squad compositions and resource loops exercises the exact same analytical mindset required to eliminate bottlenecks and tune high-efficiency enterprise workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
