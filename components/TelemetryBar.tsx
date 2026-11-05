"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TelemetryBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full mb-6">
      <div
        onClick={() => setExpanded(!expanded)}
        className="w-full inline-flex flex-wrap items-center justify-between gap-3 px-4 py-2 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-xs font-mono shadow-sm hover:border-orange dark:hover:border-orange transition-all cursor-pointer select-none"
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
          <span className="text-slate-600 dark:text-slate-300">
            Tailnet: <span className="text-blue font-semibold">4 Nodes Meshed</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
          <span className="hidden md:inline">
            GTID Lag: <span className="text-emerald-500 font-semibold">0ms</span>
          </span>
          <span className="hidden lg:inline">
            Interlocks: <span className="text-orange font-semibold">Armed</span>
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {expanded ? "▲ Hide Topology" : "▼ System Metrics"}
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
            <div className="mt-2 p-4 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <p className="text-slate-500 dark:text-slate-400">Cluster Mesh</p>
                <p className="font-bold text-slate-900 dark:text-white">Direct WireGuard P2P</p>
                <p className="text-[11px] text-blue">100.64.0.0/10 Tailnet</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 dark:text-slate-400">Replication Mode</p>
                <p className="font-bold text-slate-900 dark:text-white">Active-Active Master</p>
                <p className="text-[11px] text-emerald-500">Auto-Inc Odd/Even Sync</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 dark:text-slate-400">Identity Provider</p>
                <p className="font-bold text-slate-900 dark:text-white">Microsoft Entra ID</p>
                <p className="text-[11px] text-orange">Zero-Trust Conditional</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 dark:text-slate-400">Hardware Gateway</p>
                <p className="font-bold text-slate-900 dark:text-white">UART MCU Interlock</p>
                <p className="text-[11px] text-emerald-500">ISO/IEC 25010 Verified</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
