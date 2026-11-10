import { Cabinet, Rebuild } from "@/components/ui/hairline";

export default function Workspace() {
  return (
    <section id="workspace" className="py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10 text-left">
          <p className="text-[#0052FF] dark:text-[#38bdf8] font-mono font-medium tracking-widest uppercase mb-2 text-[11px]">
            Homelab &amp; Prototyping Bench
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
                  Cyber-Physical Bench &amp; Prototyping
                </h3>
                <div className="w-14 h-14 shrink-0">
                  <Rebuild intensity={0.7} />
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-normal mb-4">
                At my physical hardware bench, I prototype and stress-test cyber-physical systems using logic analyzers, digital oscilloscopes, and regulated bench power supplies. Before deploying automated kiosks or IoT field loggers to production, I verify serial UART packet integrity under load, evaluate inductive back-EMF suppression on 12V solenoids, and fabricate custom 3D chassis brackets to guarantee zero physical failure in real-world environments.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">Oscilloscope Diagnostics</span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">UART Protocol Sniffing</span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">Rapid 3D Chassis CAD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
