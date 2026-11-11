"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cabinet, Rebuild } from "@/components/ui/hairline";

interface MeshNode {
  id: string;
  name: string;
  ip: string;
  pingMs: number;
  role: string;
  transport: string;
  status: "online" | "syncing";
}

interface ContainerSpec {
  name: string;
  image: string;
  uptime: string;
  port: string;
  memoryMb: number;
  status: "healthy" | "active";
}

interface SerialPacket {
  id: number;
  type: "RX" | "TX";
  rawHex: string;
  decoded: string;
  crc: string;
  timeOffset: string;
}

export default function Workspace() {
  // Homelab Card State
  const [homelabTab, setHomelabTab] = useState<"tailscale" | "docker">("tailscale");
  const [isAuditingLatency, setIsAuditingLatency] = useState(false);
  const [meshNodes, setMeshNodes] = useState<MeshNode[]>([
    {
      id: "mnl-dc01",
      name: "mnl-dc01 (Workstation & Gateway)",
      ip: "100.64.0.1",
      pingMs: 12,
      role: "Subnet Router & Master Node A",
      transport: "Direct WireGuard UDP",
      status: "online",
    },
    {
      id: "sgp-dc02",
      name: "sgp-dc02 (Cloud VPS Node)",
      ip: "100.64.0.2",
      pingMs: 28,
      role: "Secondary Active Master Node B",
      transport: "Direct WireGuard UDP",
      status: "online",
    },
    {
      id: "local-sandbox",
      name: "local-sandbox (Homelab Server)",
      ip: "100.64.0.5",
      pingMs: 1,
      role: "Isolated Testbed & CI Cluster",
      transport: "LAN 1GbE Physical",
      status: "online",
    },
  ]);

  const dockerContainers: ContainerSpec[] = [
    {
      name: "mysql-gtid-cluster",
      image: "mysql:8.0.36",
      uptime: "Up 42 days",
      port: "100.64.0.1:3306",
      memoryMb: 412,
      status: "healthy",
    },
    {
      name: "tailscale-subnet-router",
      image: "tailscale/tailscale:v1.64",
      uptime: "Up 180 days",
      port: "tailscale0 (CGNAT)",
      memoryMb: 38,
      status: "active",
    },
    {
      name: "fastapi-async-worker",
      image: "python:3.11-slim",
      uptime: "Up 14 days",
      port: "127.0.0.1:8000",
      memoryMb: 124,
      status: "healthy",
    },
  ];

  const handleRunLatencyAudit = () => {
    if (isAuditingLatency) return;
    setIsAuditingLatency(true);
    setMeshNodes((prev) =>
      prev.map((n) => ({ ...n, status: "syncing" }))
    );

    setTimeout(() => {
      setMeshNodes([
        {
          id: "mnl-dc01",
          name: "mnl-dc01 (Workstation & Gateway)",
          ip: "100.64.0.1",
          pingMs: Math.floor(10 + Math.random() * 4),
          role: "Subnet Router & Master Node A",
          transport: "Direct WireGuard UDP",
          status: "online",
        },
        {
          id: "sgp-dc02",
          name: "sgp-dc02 (Cloud VPS Node)",
          ip: "100.64.0.2",
          pingMs: Math.floor(26 + Math.random() * 5),
          role: "Secondary Active Master Node B",
          transport: "Direct WireGuard UDP",
          status: "online",
        },
        {
          id: "local-sandbox",
          name: "local-sandbox (Homelab Server)",
          ip: "100.64.0.5",
          pingMs: 1,
          role: "Isolated Testbed & CI Cluster",
          transport: "LAN 1GbE Physical",
          status: "online",
        },
      ]);
      setIsAuditingLatency(false);
    }, 900);
  };

  // Hardware Bench Card State
  const [benchTab, setBenchTab] = useState<"uart" | "flyback">("uart");
  const [isInjectingPacket, setIsInjectingPacket] = useState(false);
  const [packetHistory, setPacketHistory] = useState<SerialPacket[]>([
    {
      id: 1,
      type: "RX",
      rawHex: "0xAA 0x55 0x01 0x07 0x10",
      decoded: "CMD: SOLENOID_LOCK_CH1",
      crc: "0x4F2A (VALID)",
      timeOffset: "0.00ms",
    },
    {
      id: 2,
      type: "TX",
      rawHex: "0x55 0xAA 0x01 0x00 0x00",
      decoded: "ACK: RELAY_ENERGIZED_12MS",
      crc: "0x8B1C (VALID)",
      timeOffset: "+12.4ms",
    },
    {
      id: 3,
      type: "RX",
      rawHex: "0xAA 0x55 0x02 0x09 0x00",
      decoded: "CMD: HCSR04_SAMPLE_DEPTH",
      crc: "0x91F0 (VALID)",
      timeOffset: "+25.1ms",
    },
  ]);

  const handleInjectPacket = () => {
    if (isInjectingPacket) return;
    setIsInjectingPacket(true);

    const newId = Date.now();
    const testCommands = [
      {
        rawHex: "0xAA 0x55 0x01 0x08 0x10",
        decoded: "CMD: SOLENOID_LOCK_CH2",
        crc: "0x3E11 (VALID)",
      },
      {
        rawHex: "0xAA 0x55 0x03 0x00 0xFF",
        decoded: "CMD: THERMAL_DIAGNOSTIC_QUERY",
        crc: "0xA92C (VALID)",
      },
      {
        rawHex: "0x55 0xAA 0x02 0x18 0x04",
        decoded: "ACK: HCSR04_DEPTH_18.4CM",
        crc: "0x77DA (VALID)",
      },
    ];

    const pick = testCommands[Math.floor(Math.random() * testCommands.length)];

    setTimeout(() => {
      setPacketHistory((prev) => [
        {
          id: newId,
          type: pick.decoded.startsWith("CMD") ? "RX" : "TX",
          rawHex: pick.rawHex,
          decoded: pick.decoded,
          crc: pick.crc,
          timeOffset: "+4.2ms",
        },
        ...prev.slice(0, 3),
      ]);
      setIsInjectingPacket(false);
    }, 450);
  };

  return (
    <section
      id="workspace"
      className="py-24 lg:py-32 px-4 sm:px-6 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-left">
          <p className="text-[#0052FF] dark:text-[#38bdf8] font-mono font-medium tracking-widest uppercase mb-2 text-[11px]">
            Homelab &amp; Prototyping Bench
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-primary dark:text-frost">
            Beyond the <span className="text-[#0052FF] dark:text-[#38bdf8]">Screen</span>
          </h2>
        </div>

        {/* 2-Column Responsive Bench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ======================================================== */}
          {/* CARD 1: The Stealth Rig & Homelab                        */}
          {/* ======================================================== */}
          <div className="bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] p-6 sm:p-8 rounded-2xl hover:border-electricBlue/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-primary dark:text-frost text-2xl font-medium font-sans tracking-tight">
                    The Stealth Rig &amp; Homelab
                  </h3>
                  <span className="text-[11px] font-mono text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-wider block mt-0.5">
                    Isolated Cluster • Tailscale Subnet Router
                  </span>
                </div>
                <div className="w-12 h-12 shrink-0">
                  <Cabinet intensity={0.7} />
                </div>
              </div>

              {/* Narrative Summary */}
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-normal text-sm mb-6">
                My personal workstation adheres to a strict zero-RGB, low-noise industrial philosophy: engineered for thermal stability under heavy compute workloads. Alongside my primary workstation, I maintain a compact local homelab running isolated Linux containers and a Tailscale WireGuard subnet router. This private sandbox enables me to benchmark active-active MySQL replication topologies, simulate IoT packet drops, and test zero-trust security postures offline before deploying to production.
              </p>

              {/* Interactive Homelab Telemetry Studio */}
              <div className="mb-6 rounded-xl overflow-hidden bg-black/[0.04] dark:bg-base/80 border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] font-mono flex flex-col">
                {/* Visualizer Header */}
                <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-black/[0.03] dark:bg-black/40 border-b-[0.5px] border-white/10 text-[10px] gap-2">
                  <div className="flex items-center gap-1.5 text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-widest font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Overlay Mesh: 100.64.0.0/10</span>
                  </div>

                  {/* Mode Tabs */}
                  <div className="flex items-center gap-1 bg-black/10 dark:bg-white/5 p-0.5 rounded-lg border-[0.5px] border-white/10">
                    <button
                      type="button"
                      onClick={() => setHomelabTab("tailscale")}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        homelabTab === "tailscale"
                          ? "bg-[#0052FF] dark:bg-[#38bdf8] text-white dark:text-black font-semibold shadow-sm"
                          : "text-muted hover:text-primary dark:hover:text-frost"
                      }`}
                    >
                      WireGuard Nodes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHomelabTab("docker")}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        homelabTab === "docker"
                          ? "bg-[#0052FF] dark:bg-[#38bdf8] text-white dark:text-black font-semibold shadow-sm"
                          : "text-muted hover:text-primary dark:hover:text-frost"
                      }`}
                    >
                      Docker Cluster
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-3.5 sm:p-4 space-y-2.5">
                  {homelabTab === "tailscale" ? (
                    <div className="space-y-2">
                      {meshNodes.map((node) => (
                        <div
                          key={node.id}
                          className="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/10 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                                  node.status === "syncing"
                                    ? "bg-amber-400 animate-ping"
                                    : "bg-emerald-400"
                                }`}
                              />
                              <span className="font-semibold text-primary dark:text-frost truncate">
                                {node.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted block truncate mt-0.5">
                              {node.ip} • {node.role}
                            </span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-semibold text-[#0052FF] dark:text-[#38bdf8] tabular-nums text-xs">
                              {node.pingMs}ms
                            </span>
                            <span className="text-[9px] text-muted block uppercase tracking-wider">
                              RTT
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Trigger Button */}
                      <button
                        type="button"
                        onClick={handleRunLatencyAudit}
                        disabled={isAuditingLatency}
                        className="w-full mt-2 py-1.5 px-3 rounded-lg bg-[#0052FF]/10 dark:bg-[#38bdf8]/10 hover:bg-[#0052FF]/20 text-[#0052FF] dark:text-[#38bdf8] text-[11px] font-mono font-semibold transition-colors cursor-pointer border border-[#0052FF]/20 text-center flex items-center justify-center gap-2"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isAuditingLatency ? "bg-[#0052FF] animate-ping" : "bg-[#0052FF]"
                          }`}
                        />
                        <span>
                          {isAuditingLatency
                            ? "Auditing WireGuard Mesh RTT..."
                            : "▶ Run Real-Time Latency Audit"}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {dockerContainers.map((c) => (
                        <div
                          key={c.name}
                          className="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/10 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                              <span className="font-semibold text-primary dark:text-frost truncate">
                                {c.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted block truncate mt-0.5">
                              {c.image} • {c.port}
                            </span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-semibold text-emerald-400 text-xs uppercase">
                              {c.status}
                            </span>
                            <span className="text-[9px] text-muted block tabular-nums">
                              {c.memoryMb} MB
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specs Footer */}
                <div className="p-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-muted border-t-[0.5px] border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">Public Ports:</span>
                    <span className="text-emerald-500 font-bold">0 Exposed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">Tunnel:</span>
                    <span>ChaCha20</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">ACLs:</span>
                    <span>Strict Tags</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">Uptime:</span>
                    <span className="tabular-nums">99.98%</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                  Tailscale Subnet Router
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                  Docker Linux Cluster
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                  MySQL GTID Sandbox
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 2: Cyber-Physical Bench & Prototyping               */}
          {/* ======================================================== */}
          <div className="bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] p-6 sm:p-8 rounded-2xl hover:border-electricBlue/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-primary dark:text-frost text-2xl font-medium font-sans tracking-tight">
                    Cyber-Physical Bench &amp; Prototyping
                  </h3>
                  <span className="text-[11px] font-mono text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-wider block mt-0.5">
                    Logic Analyzers • 12V Solenoids • 3D CAD
                  </span>
                </div>
                <div className="w-12 h-12 shrink-0">
                  <Rebuild intensity={0.7} />
                </div>
              </div>

              {/* Narrative Summary */}
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-normal text-sm mb-6">
                At my physical hardware bench, I prototype and stress-test cyber-physical systems using logic analyzers, digital oscilloscopes, and regulated bench power supplies. Before deploying automated kiosks or IoT field loggers to production, I verify serial UART packet integrity under load, evaluate inductive back-EMF suppression on 12V solenoids, and fabricate custom 3D chassis brackets to guarantee zero physical failure in real-world environments.
              </p>

              {/* Interactive Hardware Diagnostics Station */}
              <div className="mb-6 rounded-xl overflow-hidden bg-black/[0.04] dark:bg-base/80 border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] font-mono flex flex-col">
                {/* Visualizer Header */}
                <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-black/[0.03] dark:bg-black/40 border-b-[0.5px] border-white/10 text-[10px] gap-2">
                  <div className="flex items-center gap-1.5 text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-widest font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>Bench Power: 12.0V / 2.5A DC</span>
                  </div>

                  {/* Mode Tabs */}
                  <div className="flex items-center gap-1 bg-black/10 dark:bg-white/5 p-0.5 rounded-lg border-[0.5px] border-white/10">
                    <button
                      type="button"
                      onClick={() => setBenchTab("uart")}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        benchTab === "uart"
                          ? "bg-[#0052FF] dark:bg-[#38bdf8] text-white dark:text-black font-semibold shadow-sm"
                          : "text-muted hover:text-primary dark:hover:text-frost"
                      }`}
                    >
                      UART Sniffer
                    </button>
                    <button
                      type="button"
                      onClick={() => setBenchTab("flyback")}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        benchTab === "flyback"
                          ? "bg-[#0052FF] dark:bg-[#38bdf8] text-white dark:text-black font-semibold shadow-sm"
                          : "text-muted hover:text-primary dark:hover:text-frost"
                      }`}
                    >
                      Inductive Clamp Scope
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-3.5 sm:p-4 space-y-2.5">
                  {benchTab === "uart" ? (
                    <div className="space-y-2">
                      {packetHistory.map((pkt) => (
                        <div
                          key={pkt.id}
                          className="p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/10 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                  pkt.type === "RX"
                                    ? "bg-[#0052FF]/20 text-[#38bdf8]"
                                    : "bg-emerald-500/20 text-emerald-400"
                                }`}
                              >
                                {pkt.type}
                              </span>
                              <span className="font-semibold text-primary dark:text-frost truncate">
                                {pkt.decoded}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted block font-mono truncate mt-0.5">
                              {pkt.rawHex} • CRC: {pkt.crc}
                            </span>
                          </div>

                          <span className="text-[10px] text-muted tabular-nums shrink-0">
                            {pkt.timeOffset}
                          </span>
                        </div>
                      ))}

                      {/* Trigger Button */}
                      <button
                        type="button"
                        onClick={handleInjectPacket}
                        disabled={isInjectingPacket}
                        className="w-full mt-2 py-1.5 px-3 rounded-lg bg-[#0052FF]/10 dark:bg-[#38bdf8]/10 hover:bg-[#0052FF]/20 text-[#0052FF] dark:text-[#38bdf8] text-[11px] font-mono font-semibold transition-colors cursor-pointer border border-[#0052FF]/20 text-center flex items-center justify-center gap-2"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isInjectingPacket ? "bg-[#0052FF] animate-ping" : "bg-[#0052FF]"
                          }`}
                        />
                        <span>
                          {isInjectingPacket
                            ? "Transmitting 115,200 Baud Frame..."
                            : "▶ Inject Test Serial Packet"}
                        </span>
                      </button>
                    </div>
                  ) : (
                    /* Flyback Scope Comparison View */
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-[#0a0f1d] text-slate-200 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Protected: 1N4007 Diode Active
                          </span>
                          <span className="text-emerald-400 font-mono text-[10px] font-semibold">
                            Clamp: +12.7V (Safe)
                          </span>
                        </div>

                        {/* Safe Waveform */}
                        <div className="h-8 w-full bg-slate-900 rounded border border-white/10 relative overflow-hidden flex items-center px-2">
                          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 24">
                            <line x1="0" y1="20" x2="50" y2="20" stroke="#34d399" strokeWidth="2" />
                            <line x1="50" y1="20" x2="50" y2="4" stroke="#34d399" strokeWidth="2" />
                            <line x1="50" y1="4" x2="220" y2="4" stroke="#34d399" strokeWidth="2" />
                            <line x1="220" y1="4" x2="225" y2="2" stroke="#34d399" strokeWidth="2" />
                            <line x1="225" y1="2" x2="230" y2="20" stroke="#34d399" strokeWidth="2" />
                            <line x1="230" y1="20" x2="300" y2="20" stroke="#34d399" strokeWidth="2" />
                          </svg>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span className="text-rose-400 font-bold flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                            Unprotected Coil (Simulation)
                          </span>
                          <span className="text-rose-400 font-mono text-[10px] font-semibold">
                            Back-EMF: -85V Destructive Spike
                          </span>
                        </div>

                        {/* Unprotected Spiking Waveform */}
                        <div className="h-8 w-full bg-slate-900 rounded border border-white/10 relative overflow-hidden flex items-center px-2">
                          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 24">
                            <line x1="0" y1="18" x2="50" y2="18" stroke="#f43f5e" strokeWidth="2" />
                            <line x1="50" y1="18" x2="50" y2="4" stroke="#f43f5e" strokeWidth="2" />
                            <line x1="50" y1="4" x2="220" y2="4" stroke="#f43f5e" strokeWidth="2" />
                            <line x1="220" y1="4" x2="222" y2="24" stroke="#f43f5e" strokeWidth="2" />
                            <line x1="222" y1="24" x2="228" y2="0" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2" />
                            <line x1="228" y1="0" x2="235" y2="18" stroke="#f43f5e" strokeWidth="2" />
                            <line x1="235" y1="18" x2="300" y2="18" stroke="#f43f5e" strokeWidth="2" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Specs Footer */}
                <div className="p-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-muted border-t-[0.5px] border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">Baud:</span>
                    <span className="tabular-nums font-bold">115,200</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">Isolation:</span>
                    <span>5kV Opto</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">Clamp:</span>
                    <span className="tabular-nums">12.7V Max</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">3D Material:</span>
                    <span>PETG High-Temp</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                  Oscilloscope Diagnostics
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                  UART Protocol Sniffing
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-surface/60 text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                  Rapid 3D Chassis CAD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
