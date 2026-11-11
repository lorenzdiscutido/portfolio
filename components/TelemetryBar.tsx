"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stack, Relay, Vault, Router } from "@/components/ui/hairline";

export default function TelemetryBar() {
  const [expanded, setExpanded] = useState(false);

  const handleLaunchTerminal = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("open-terminal"));
  };

  return (
    <div className="w-full mb-6 font-mono text-xs">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label="Toggle Tailnet Mesh Topology Details"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
        className="w-full inline-flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] text-primary hover:border-electricBlue/50 dark:hover:border-electricBlue/50 hover:shadow-[0_0_15px_rgba(0,82,255,0.12)] transition-all duration-200 focus-visible:ring-1 focus-visible:ring-[#0052FF] outline-none cursor-pointer select-none"
      >
        <div data-testid="live-telemetry-pill" className="flex items-center gap-3 flex-wrap">
          <span className="flex h-2 w-2 relative shrink-0 items-center justify-center my-auto">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-widest uppercase text-muted">
            SYSTEM TELEMETRY
          </span>
          <span className="text-primary/20">|</span>
          <span className="font-mono text-[11px] tracking-wider text-slate-600 dark:text-slate-300">
            System: Online | <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold tabular-nums">Commits: 29</span>
          </span>
          <span className="hidden sm:inline text-primary/20">|</span>
          <span className="hidden sm:inline font-mono text-[11px] tracking-wider text-slate-600 dark:text-slate-300">
            TAILNET: <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold tabular-nums">4 NODES</span>
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px] tracking-wider text-slate-600 dark:text-slate-300">
          <span className="hidden md:inline">
            LATENCY: <span className="text-primary font-semibold tabular-nums">&lt;5ms</span>
          </span>
          <span className="hidden lg:inline">
            TOPOLOGY: <span className="text-[#0052FF] dark:text-[#38bdf8] font-semibold">MESHED</span>
          </span>
          <span className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-frost font-semibold transition-colors duration-200">
            {expanded ? "▲ COLLAPSE" : "▼ INSPECT TOPOLOGY"}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-5 rounded-xl bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] text-primary">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="p-3.5 rounded-lg bg-black/[0.03] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 flex flex-col justify-between hover:border-electricBlue/50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-[11px] font-mono uppercase tracking-widest">NODE 01: DATABASE</p>
                    <div className="w-9 h-9 shrink-0">
                      <Stack intensity={0.7} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-sans font-medium text-primary text-xs">vonotec-cluster-alpha</p>
                    <p className="text-[11px] font-mono text-[#0052FF] dark:text-[#38bdf8]">100.64.0.1 (MySQL Master A)</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-black/[0.03] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 flex flex-col justify-between hover:border-electricBlue/50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-[11px] font-mono uppercase tracking-widest">NODE 02: IOT GATEWAY</p>
                    <div className="w-9 h-9 shrink-0">
                      <Relay intensity={0.7} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-sans font-medium text-primary text-xs">iskiosk-mcu-gateway</p>
                    <p className="text-[11px] font-mono text-[#0052FF] dark:text-[#38bdf8]">100.64.0.2 (UART Interlock)</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-black/[0.03] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 flex flex-col justify-between hover:border-electricBlue/50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-[11px] font-mono uppercase tracking-widest">NODE 03: IDENTITY PROXY</p>
                    <div className="w-9 h-9 shrink-0">
                      <Vault intensity={0.7} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-sans font-medium text-primary text-xs">entra-id-governance</p>
                    <p className="text-[11px] font-mono text-[#0052FF] dark:text-[#38bdf8]">MSAL OAuth 2.0 Client</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-black/[0.03] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 flex flex-col justify-between hover:border-electricBlue/50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-[11px] font-mono uppercase tracking-widest">NODE 04: WORKSTATION</p>
                    <div className="w-9 h-9 shrink-0">
                      <Router intensity={0.7} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-sans font-medium text-primary text-xs">jld-stealth-rig</p>
                    <p className="text-[11px] font-mono text-[#0052FF] dark:text-[#38bdf8]">100.64.0.4 (Local Linux Node)</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[11px] font-mono tracking-wider text-muted">
                    Zero public internet ports exposed. Mesh routing enforced via Tailnet ACL policies.
                  </span>
                  <span className="text-[11px] font-mono tracking-wider px-2 py-0.5 rounded bg-black/[0.04] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 text-slate-600 dark:text-slate-300">
                    LATEST PUSH: <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold">29 COMMITS</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLaunchTerminal}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0052FF] hover:bg-[#0041cc] text-white font-medium text-[11px] uppercase tracking-wider font-mono transition-colors duration-200 cursor-pointer flex items-center gap-1.5 shadow-none"
                >
                  <span aria-hidden="true">&gt;_</span>
                  <span>Launch Cluster CLI Terminal</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
