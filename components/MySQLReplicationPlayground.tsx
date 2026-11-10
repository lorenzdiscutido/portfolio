"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TopologyState = "healthy" | "partitioned" | "resyncing";

export default function MySQLReplicationPlayground() {
  const [state, setState] = useState<TopologyState>("healthy");

  return (
    <div className="w-full my-8 p-6 md:p-8 rounded-2xl bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/5">
        <div>
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#0052FF] dark:text-[#38bdf8] block mb-1">
            Interactive Architecture Playground
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-primary font-sans">
            Circular Master-Master Failover &amp; GTID Catch-Up
          </h3>
        </div>

        {/* State Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-black/[0.04] dark:bg-base/60 border border-black/10 dark:border-white/5">
          <button
            type="button"
            onClick={() => setState("healthy")}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
              state === "healthy"
                ? "bg-[#0052FF] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-primary"
            }`}
          >
            1. Active-Active Sync
          </button>
          <button
            type="button"
            onClick={() => setState("partitioned")}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
              state === "partitioned"
                ? "bg-[#ef4444] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-primary"
            }`}
          >
            2. Link Severed / Outage
          </button>
          <button
            type="button"
            onClick={() => setState("resyncing")}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
              state === "resyncing"
                ? "bg-[#FF7A00] text-black font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-primary"
            }`}
          >
            3. GTID Catch-Up
          </button>
        </div>
      </div>

      {/* Schematic Nodes Viewport */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 rounded-xl bg-black/[0.02] dark:bg-base/40 border border-black/5 dark:border-white/5 mb-6">
        {/* Node A (Master 1) */}
        <div
          className={`p-5 rounded-xl border transition-all duration-300 ${
            state === "partitioned"
              ? "bg-red-500/5 border-red-500/30 opacity-70"
              : "bg-surface/90 border-black/10 dark:border-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold uppercase text-[#0052FF] dark:text-[#38bdf8]">
              Node A // Primary Master
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono">
              <span
                className={`h-2 w-2 rounded-full ${
                  state === "partitioned"
                    ? "bg-[#ef4444]"
                    : state === "resyncing"
                    ? "bg-[#FF7A00] animate-pulse"
                    : "bg-[#22c55e]"
                }`}
              />
              <span className="font-semibold text-primary">
                {state === "partitioned"
                  ? "ISOLATED"
                  : state === "resyncing"
                  ? "NEGOTIATING"
                  : "ONLINE"}
              </span>
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-primary font-bold">100.64.0.1:3306 (Tailnet IP)</p>
            <p className="text-slate-600 dark:text-slate-300">
              server-id: 1 | auto_inc_offset: 1 (ODD: 1, 3, 5...)
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              GTID: 3a9e-001:{state === "resyncing" ? "1-412 (Lagging)" : "1-490"}
            </p>
          </div>
        </div>

        {/* Node B (Master 2) */}
        <div className="p-5 rounded-xl bg-surface/90 border border-black/10 dark:border-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold uppercase text-[#0052FF] dark:text-[#38bdf8]">
              Node B // Secondary Master
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="font-semibold text-primary">
                {state === "partitioned" ? "BUFFERING WRITES" : "ONLINE"}
              </span>
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-primary font-bold">100.64.0.2:3306 (Tailnet IP)</p>
            <p className="text-slate-600 dark:text-slate-300">
              server-id: 2 | auto_inc_offset: 2 (EVEN: 2, 4, 6...)
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              GTID: 3a9e-002:1-490 {state === "partitioned" && "(Queuing binlog)"}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Simulated Telemetry Terminal */}
      <div className="p-4 rounded-xl bg-surfaceDark text-white font-mono text-xs overflow-x-auto border border-black/20">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] text-slate-400">
          <span>// WireGuard Overlay Stream Status</span>
          <span className="text-[#38bdf8]">gtid_mode=ON</span>
        </div>

        <AnimatePresence mode="wait">
          {state === "healthy" && (
            <motion.div
              key="healthy"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="space-y-1"
            >
              <p className="text-[#22c55e]">
                &gt; Slave_IO_Running: Yes | Slave_SQL_Running: Yes
              </p>
              <p className="text-slate-300">
                &gt; Seconds_Behind_Master: 0ms (Tailscale direct p2p WireGuard route)
              </p>
              <p className="text-slate-400">
                &gt; Auto-increment odd/even keyspace partitioning active. Zero write collisions.
              </p>
            </motion.div>
          )}

          {state === "partitioned" && (
            <motion.div
              key="partitioned"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="space-y-1"
            >
              <p className="text-[#ef4444]">
                &gt; WARNING: Peer 100.64.0.1 unreachable. Slave_IO_Running: Connecting
              </p>
              <p className="text-slate-300">
                &gt; Node B buffers client writes to local binlog (mysql-bin.000412).
              </p>
              <p className="text-[#FF7A00]">
                &gt; No split-brain corruption: Odd/even auto_increment offsets preserve key isolation.
              </p>
            </motion.div>
          )}

          {state === "resyncing" && (
            <motion.div
              key="resyncing"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="space-y-1"
            >
              <p className="text-[#FF7A00]">
                &gt; RECOVERY: MASTER_AUTO_POSITION=1 handshake initiated.
              </p>
              <p className="text-[#38bdf8]">
                &gt; Negotiating diff: Replaying missing GTID range 3a9e-002:413-490...
              </p>
              <p className="text-[#22c55e]">
                &gt; Catch-up complete in 240ms. Master-Master replication synchronized with zero data loss.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
