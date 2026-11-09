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
        className="w-full inline-flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 text-[#f8fafc] shadow-none hover:border-[#0052FF]/50 transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-[#0052FF] outline-none cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]"></span>
          </span>
          <span className="font-bold text-[#f8fafc] uppercase tracking-wider">
            TELEMETRY STREAM
          </span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400">
            TAILNET: <span className="text-[#0052FF] font-bold">4 NODES MESHED</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline">
            GTID LAG: <span className="text-[#f8fafc] font-semibold">0ms</span>
          </span>
          <span className="hidden lg:inline">
            INTERLOCKS: <span className="text-[#0052FF] font-semibold">ARMED</span>
          </span>
          <span className="text-xs text-slate-400 hover:text-[#f8fafc] font-semibold transition-colors duration-200">
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
            <div className="mt-2 p-5 rounded-xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 text-[#f8fafc] shadow-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#0f1115]/80 border border-white/5 space-y-1">
                  <p className="text-slate-400 text-[11px] font-medium">NODE 01: DATABASE</p>
                  <p className="font-bold text-[#f8fafc] text-xs">vonotec-cluster-alpha</p>
                  <p className="text-[11px] text-[#0052FF]">100.64.0.1 (MySQL Master A)</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0f1115]/80 border border-white/5 space-y-1">
                  <p className="text-slate-400 text-[11px] font-medium">NODE 02: IOT GATEWAY</p>
                  <p className="font-bold text-[#f8fafc] text-xs">iskiosk-mcu-gateway</p>
                  <p className="text-[11px] text-[#0052FF]">100.64.0.2 (UART Interlock)</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0f1115]/80 border border-white/5 space-y-1">
                  <p className="text-slate-400 text-[11px] font-medium">NODE 03: IDENTITY PROXY</p>
                  <p className="font-bold text-[#f8fafc] text-xs">entra-id-governance</p>
                  <p className="text-[11px] text-[#0052FF]">MSAL OAuth 2.0 Client</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0f1115]/80 border border-white/5 space-y-1">
                  <p className="text-slate-400 text-[11px] font-medium">NODE 04: WORKSTATION</p>
                  <p className="font-bold text-[#f8fafc] text-xs">jld-stealth-rig</p>
                  <p className="text-[11px] text-[#0052FF]">100.64.0.4 (Local Linux Node)</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Zero public internet ports exposed. Mesh routing enforced via Tailnet ACL policies.
                </span>
                <button
                  type="button"
                  onClick={handleLaunchTerminal}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0052FF] text-[#f8fafc] font-bold text-xs uppercase tracking-wider font-mono hover:bg-[#0041cc] transition-colors duration-200 cursor-pointer flex items-center gap-1.5 shadow-none"
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
