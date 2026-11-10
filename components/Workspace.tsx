import { Cabinet, Rebuild } from "@/components/ui/hairline";

export default function Workspace() {
  return (
    <section id="workspace" className="py-24 lg:py-32 px-6 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-[#0052FF] dark:text-[#38bdf8] font-mono font-medium tracking-widest uppercase mb-2 text-[11px]">
            Off-Duty Mechanics
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-primary dark:text-frost">
            Beyond the <span className="text-[#0052FF] dark:text-[#38bdf8]">Screen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] p-8 rounded-2xl hover:border-electricBlue/50 dark:hover:border-electricBlue/50 hover:shadow-[0_0_15px_rgba(0,82,255,0.12)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-primary dark:text-frost text-2xl font-medium font-sans tracking-tight">
                  The Stealth Rig &amp; Homelab
                </h3>
                <div className="w-14 h-14 shrink-0">
                  <Cabinet intensity={0.7} />
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-normal mb-4">
                My personal workstation adheres to a strict zero-RGB, low-noise industrial philosophy: engineered for thermal stability under heavy compute workloads. Alongside my primary workstation, I maintain a compact local homelab running isolated Linux containers and a Tailscale WireGuard subnet router. This private sandbox enables me to benchmark active-active MySQL replication topologies, simulate IoT packet drops, and test zero-trust security postures offline before deploying to production.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">Tailscale Subnet Router</span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">Docker Linux Cluster</span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">MySQL GTID Sandbox</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] p-8 rounded-2xl hover:border-electricBlue/50 dark:hover:border-electricBlue/50 hover:shadow-[0_0_15px_rgba(0,82,255,0.12)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-primary dark:text-frost text-2xl font-medium font-sans tracking-tight">
                  System Mechanics &amp; Discrete Modeling
                </h3>
                <div className="w-14 h-14 shrink-0">
                  <Rebuild intensity={0.7} />
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-normal mb-4">
                Off-duty, I dissect complex real-time combat engines (e.g. Zenless Zone Zero) through the lens of discrete state machines and frame-data modeling. Calculating frame-window tolerances, anomaly buildup thresholds, and resource throughput models exercises the exact mathematical rigor needed to diagnose distributed network latency, resolve concurrency bottlenecks, and tune high-throughput enterprise pipelines.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">State Machine Modeling</span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">Throughput Optimization</span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">Concurrency Profiling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
