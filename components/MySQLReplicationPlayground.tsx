"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TopologyState = "healthy" | "partitioned" | "resyncing";

export default function MySQLReplicationPlayground() {
  const [state, setState] = useState<TopologyState>("healthy");

  const toggleFailure = () => {
    if (state === "healthy") {
      setState("partitioned");
    } else if (state === "partitioned") {
      setState("resyncing");
    } else {
      setState("healthy");
    }
  };

  return (
    <div className="w-full my-8 p-6 md:p-8 rounded-2xl bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      {/* Header & Simulator Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b-[0.5px] border-white/10 dark:border-white/10 border-black/5">
        <div>
          <span className="text-[11px] font-mono font-medium tracking-widest uppercase text-[#0052FF] dark:text-[#38bdf8] block mb-1">
            Interactive Architecture Playground
          </span>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-primary dark:text-frost font-sans">
            4-Node Tailscale Mesh // Circular Master-Master Failover
          </h3>
          <p className="text-xs font-mono text-muted mt-1">
            Simulate node failure, traffic rerouting, and GTID auto-positioning over WireGuard CGNAT.
          </p>
        </div>

        {/* Primary Action Button & State Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleFailure}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm ${
              state === "healthy"
                ? "bg-[#ef4444] hover:bg-[#dc2626] text-white"
                : state === "partitioned"
                ? "bg-[#f59e0b] hover:bg-[#d97706] text-black"
                : "bg-[#0052FF] hover:bg-[#0041cc] text-white"
            }`}
          >
            <span>
              {state === "healthy"
                ? "⚡ Simulate Node 01 Failure"
                : state === "partitioned"
                ? "▶ Reconnect Node & Re-Sync"
                : "✔ Restore Active-Active Sync"}
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.04] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5">
            <button
              type="button"
              onClick={() => setState("healthy")}
              className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider font-medium transition-all ${
                state === "healthy"
                  ? "bg-[#0052FF] text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary"
              }`}
            >
              Healthy
            </button>
            <button
              type="button"
              onClick={() => setState("partitioned")}
              className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider font-medium transition-all ${
                state === "partitioned"
                  ? "bg-[#ef4444] text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary"
              }`}
            >
              Severed
            </button>
            <button
              type="button"
              onClick={() => setState("resyncing")}
              className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider font-medium transition-all ${
                state === "resyncing"
                  ? "bg-[#f59e0b] text-black font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary"
              }`}
            >
              GTID Sync
            </button>
          </div>
        </div>
      </div>

      {/* Visual Dynamic Rerouting HUD Bar */}
      <div className="mb-6 px-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-base/70 border-[0.5px] border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted">Ingress Router:</span>
          <span className="text-primary font-semibold">100.64.0.3 (Subnet Proxy)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted">Current Write Target:</span>
          <span
            className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
              state === "healthy"
                ? "bg-[#0052FF]/20 text-[#0052FF] dark:text-[#38bdf8]"
                : state === "partitioned"
                ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                : "bg-[#22c55e]/20 text-[#22c55e]"
            }`}
          >
            {state === "healthy"
              ? "Node 01 (100.64.0.1) — Primary Route"
              : "Node 02 (100.64.0.2) — Rerouted Active Target"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted">Mesh State:</span>
          <span
            className={`font-semibold uppercase tracking-wider ${
              state === "healthy"
                ? "text-[#22c55e]"
                : state === "partitioned"
                ? "text-[#ef4444]"
                : "text-[#f59e0b]"
            }`}
          >
            {state === "healthy"
              ? "● 4/4 Meshed"
              : state === "partitioned"
              ? "▲ Failover Active (1 Degraded)"
              : "⚡ GTID Auto-Positioning"}
          </span>
        </div>
      </div>

      {/* 4-Node Tailscale Mesh Grid Viewport */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch p-5 rounded-xl bg-black/[0.02] dark:bg-base/40 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 mb-6">
        {/* Node 01: MySQL Master A */}
        <motion.div
          animate={{
            borderColor:
              state === "partitioned"
                ? "rgba(239, 68, 68, 0.4)"
                : state === "resyncing"
                ? "rgba(245, 158, 11, 0.4)"
                : "rgba(0, 82, 255, 0.3)",
          }}
          transition={{ duration: 0.3 }}
          className={`p-4 rounded-xl border-[0.5px] flex flex-col justify-between transition-all duration-300 ${
            state === "partitioned"
              ? "bg-red-500/10 opacity-70"
              : state === "resyncing"
              ? "bg-[#f59e0b]/10"
              : "bg-[#1e2128]/80 dark:bg-[#1e2128]/80 bg-white/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0052FF] dark:text-[#38bdf8]">
                NODE 01: MASTER A
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold">
                <span
                  className={`h-2 w-2 rounded-full ${
                    state === "partitioned"
                      ? "bg-[#ef4444]"
                      : state === "resyncing"
                      ? "bg-[#f59e0b] animate-pulse"
                      : "bg-[#22c55e]"
                  }`}
                />
                <span className="text-primary">
                  {state === "partitioned"
                    ? "OFFLINE"
                    : state === "resyncing"
                    ? "REPLAYING"
                    : "ONLINE"}
                </span>
              </span>
            </div>
            <p className="font-sans font-medium text-primary text-sm">vonotec-cluster-alpha</p>
            <p className="font-mono text-xs text-[#0052FF] dark:text-[#38bdf8] font-bold mt-1">
              100.64.0.1:3306
            </p>
          </div>

          <div className="mt-4 pt-2 border-t-[0.5px] border-white/10 space-y-1 font-mono text-[11px] text-muted">
            <p>server-id: 1 (ODD: 1, 3, 5...)</p>
            <p>
              GTID:{" "}
              <span className="text-primary font-semibold">
                {state === "resyncing" ? "1-412 (Lagging 78 tx)" : "1-490 (Syncd)"}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Node 02: MySQL Master B */}
        <motion.div
          animate={{
            borderColor:
              state === "partitioned"
                ? "rgba(245, 158, 11, 0.5)"
                : "rgba(34, 197, 94, 0.3)",
          }}
          transition={{ duration: 0.3 }}
          className={`p-4 rounded-xl border-[0.5px] flex flex-col justify-between transition-all duration-300 ${
            state === "partitioned"
              ? "bg-[#f59e0b]/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              : "bg-[#1e2128]/80 dark:bg-[#1e2128]/80 bg-white/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0052FF] dark:text-[#38bdf8]">
                NODE 02: MASTER B
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                <span className="text-primary">
                  {state === "partitioned" ? "PRIMARY TARGET" : "ONLINE"}
                </span>
              </span>
            </div>
            <p className="font-sans font-medium text-primary text-sm">edge-kiosk-master</p>
            <p className="font-mono text-xs text-[#0052FF] dark:text-[#38bdf8] font-bold mt-1">
              100.64.0.2:3306
            </p>
          </div>

          <div className="mt-4 pt-2 border-t-[0.5px] border-white/10 space-y-1 font-mono text-[11px] text-muted">
            <p>server-id: 2 (EVEN: 2, 4, 6...)</p>
            <p>
              GTID:{" "}
              <span className="text-primary font-semibold">
                {state === "partitioned" ? "1-490 (Absorbing writes)" : "1-490 (Syncd)"}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Node 03: Tailscale Subnet Ingress Router */}
        <div className="p-4 rounded-xl bg-[#1e2128]/80 dark:bg-[#1e2128]/80 bg-white/90 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0052FF] dark:text-[#38bdf8]">
                NODE 03: INGRESS ROUTER
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                <span className="text-primary">HEALTH CHECKER</span>
              </span>
            </div>
            <p className="font-sans font-medium text-primary text-sm">cloud-gateway</p>
            <p className="font-mono text-xs text-[#0052FF] dark:text-[#38bdf8] font-bold mt-1">
              100.64.0.3:443
            </p>
          </div>

          <div className="mt-4 pt-2 border-t-[0.5px] border-white/10 space-y-1 font-mono text-[11px] text-muted">
            <p>Role: WireGuard Ingress</p>
            <p>
              Route:{" "}
              <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold">
                {state === "healthy" ? "→ 100.64.0.1" : "→ 100.64.0.2 (Rerouted)"}
              </span>
            </p>
          </div>
        </div>

        {/* Node 04: Replica & Cold Storage */}
        <div className="p-4 rounded-xl bg-[#1e2128]/80 dark:bg-[#1e2128]/80 bg-white/90 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0052FF] dark:text-[#38bdf8]">
                NODE 04: BINLOG REPLICA
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                <span className="text-primary">ARCHIVE</span>
              </span>
            </div>
            <p className="font-sans font-medium text-primary text-sm">backup-storage-rig</p>
            <p className="font-mono text-xs text-[#0052FF] dark:text-[#38bdf8] font-bold mt-1">
              100.64.0.4:3306
            </p>
          </div>

          <div className="mt-4 pt-2 border-t-[0.5px] border-white/10 space-y-1 font-mono text-[11px] text-muted">
            <p>server-id: 4 (Read-Only)</p>
            <p>
              Replication Source:{" "}
              <span className="text-primary font-semibold">
                {state === "partitioned" ? "100.64.0.2 (Failover)" : "100.64.0.1 (Primary)"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Simulated Telemetry Terminal */}
      <div className="p-4 rounded-xl bg-[#0f1115]/90 text-white font-mono text-xs overflow-x-auto border-[0.5px] border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b-[0.5px] border-white/10 text-[11px] text-muted">
          <span className="uppercase tracking-wider">{"// Tailscale WireGuard Overlay Event Log"}</span>
          <span className="text-[#38bdf8] font-semibold">gtid_mode=ON | enforce_gtid_consistency=ON</span>
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
                &gt; [MESH:HEALTHY] 4/4 nodes active over Tailnet CGNAT 100.64.0.0/10.
              </p>
              <p className="text-[#38bdf8]">
                &gt; Slave_IO_Running: Yes | Slave_SQL_Running: Yes | Seconds_Behind_Master: 0ms
              </p>
              <p className="text-slate-300">
                &gt; Ingress proxy (100.64.0.3) actively routing write requests to Node 01 (100.64.0.1).
              </p>
              <p className="text-slate-400">
                &gt; Deterministic keyspace partitioning active (Node 01: ODD keys | Node 02: EVEN keys). Zero collisions.
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
                &gt; [ALERT] Node 01 (100.64.0.1) unreachable! Heartbeat check failed (Connection Timed Out).
              </p>
              <p className="text-[#f59e0b]">
                &gt; [FAILOVER DISPATCHED] Ingress router (100.64.0.3) rerouted 100% of write traffic to Node 02 in 34ms.
              </p>
              <p className="text-slate-300">
                &gt; Node 02 buffers client transactions to local binlog (mysql-bin.000490) with zero write downtime.
              </p>
              <p className="text-[#22c55e]">
                &gt; Backup Node 04 automatically repointed replication stream to Node 02 via Tailscale ACL.
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
              <p className="text-[#f59e0b]">
                &gt; [RECOVERY] Node 01 (100.64.0.1) rebooted. Handshake established via Tailscale WireGuard tunnel.
              </p>
              <p className="text-[#38bdf8]">
                &gt; Executing: CHANGE REPLICATION SOURCE TO SOURCE_AUTO_POSITION = 1;
              </p>
              <p className="text-slate-300">
                &gt; Replaying missing binlog diff: GTID range 3a9e-002:413-490 (78 transactions replayed in 180ms).
              </p>
              <p className="text-[#22c55e]">
                &gt; [RESYNCHRONIZED] Master-Master cluster fully synchronized. Zero split-brain data corruption.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
