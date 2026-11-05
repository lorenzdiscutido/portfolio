"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TelemetryBar() {
  const [expanded, setExpanded] = useState(false);

  const handleLaunchTerminal = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("open-terminal"));
  };

  return (
    <div className="w-full mb-6">
      <div
        onClick={() => setExpanded(!expanded)}
        className="w-full inline-flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-xs font-mono shadow-sm hover:border-orange dark:hover:border-orange transition-all cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Telemetry Stream
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-500">|</span>
          <span className="text-slate-700 dark:text-slate-300">
            Tailnet: <span className="text-blue-600 dark:text-blue-400 font-bold">4 Nodes Meshed</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
          <span className="hidden md:inline">
            GTID Lag: <span className="text-emerald-500 font-semibold">0ms</span>
          </span>
          <span className="hidden lg:inline">
            Interlocks: <span className="text-orange-700 dark:text-orange font-semibold">Armed</span>
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            {expanded ? "▲ Hide Mesh Details" : "▼ Inspect Topology"}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-5 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 text-xs font-mono shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Node 01: Database</p>
                  <p className="font-bold text-slate-900 dark:text-white">vonotec-cluster-alpha</p>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400">100.64.0.1 (MySQL Master A)</p>
                </div>
                <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Node 02: IoT Gateway</p>
                  <p className="font-bold text-slate-900 dark:text-white">iskiosk-mcu-gateway</p>
                  <p className="text-[11px] text-emerald-500">100.64.0.2 (UART Reed Interlock)</p>
                </div>
                <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Node 03: Identity Proxy</p>
                  <p className="font-bold text-slate-900 dark:text-white">entra-id-governance</p>
                  <p className="text-[11px] text-orange-700 dark:text-orange">MSAL OAuth 2.0 Client Flow</p>
                </div>
                <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Node 04: Workstation</p>
                  <p className="font-bold text-slate-900 dark:text-white">jld-stealth-rig</p>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400">100.64.0.4 (Local Linux Node)</p>
                </div>
              </div>

              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-[11px] text-slate-600 dark:text-slate-400">
                  Zero public internet ports exposed. Mesh routing enforced via Tailnet ACL policies.
                </span>
                <button
                  type="button"
                  onClick={handleLaunchTerminal}
                  className="px-3 py-1.5 rounded-lg bg-orange text-black font-bold text-xs uppercase tracking-wider font-mono shadow-[2px_2px_0px_0px_#000000] hover:shadow-[1px_1px_0px_0px_#000000] active:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
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
