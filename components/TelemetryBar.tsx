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
        className="w-full inline-flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 text-primary shadow-none hover:border-[#0052FF]/50 transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-[#0052FF] outline-none cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]"></span>
          </span>
          <span className="font-bold text-primary uppercase tracking-wider">
            TELEMETRY STREAM
          </span>
          <span className="text-primary/20">|</span>
          <span className="text-muted">
            TAILNET: <span className="text-[#0052FF] font-bold">4 NODES MESHED</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted">
          <span className="hidden md:inline">
            GTID LAG: <span className="text-primary font-semibold">0ms</span>
          </span>
          <span className="hidden lg:inline">
            INTERLOCKS: <span className="text-[#0052FF] font-semibold">ARMED</span>
          </span>
          <span className="text-xs text-muted hover:text-primary font-semibold transition-colors duration-200">
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
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-5 rounded-xl bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 text-primary shadow-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="p-3.5 rounded-lg bg-base/60 border border-black/10 dark:border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-[11px] font-medium">NODE 01: DATABASE</p>
                    <div className="w-9 h-9 shrink-0">
                      <Stack intensity={0.7} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-primary text-xs">vonotec-cluster-alpha</p>
                    <p className="text-[11px] text-[#0052FF]">100.64.0.1 (MySQL Master A)</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-base/60 border border-black/10 dark:border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-[11px] font-medium">NODE 02: IOT GATEWAY</p>
                    <div className="w-9 h-9 shrink-0">
                      <Relay intensity={0.7} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-primary text-xs">iskiosk-mcu-gateway</p>
                    <p className="text-[11px] text-[#0052FF]">100.64.0.2 (UART Interlock)</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-base/60 border border-black/10 dark:border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-[11px] font-medium">NODE 03: IDENTITY PROXY</p>
                    <div className="w-9 h-9 shrink-0">
                      <Vault intensity={0.7} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-primary text-xs">entra-id-governance</p>
                    <p className="text-[11px] text-[#0052FF]">MSAL OAuth 2.0 Client</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-base/60 border border-black/10 dark:border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-[11px] font-medium">NODE 04: WORKSTATION</p>
                    <div className="w-9 h-9 shrink-0">
                      <Router intensity={0.7} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-primary text-xs">jld-stealth-rig</p>
                    <p className="text-[11px] text-[#0052FF]">100.64.0.4 (Local Linux Node)</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-black/10 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-[11px] text-muted">
                  Zero public internet ports exposed. Mesh routing enforced via Tailnet ACL policies.
                </span>
                <button
                  type="button"
                  onClick={handleLaunchTerminal}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0052FF] text-white font-bold text-xs uppercase tracking-wider font-mono hover:bg-[#0041cc] transition-colors duration-200 cursor-pointer flex items-center gap-1.5 shadow-none"
                >
                  <span>&gt;_ Launch Cluster CLI Terminal</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
