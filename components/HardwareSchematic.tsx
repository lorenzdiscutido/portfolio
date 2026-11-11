"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HardwareSchematic() {
  const [activeDrawer, setActiveDrawer] = useState<"drawer1" | "drawer2">("drawer1");
  const [isActuating, setIsActuating] = useState(false);
  const [watchdogTime, setWatchdogTime] = useState<number>(0);
  const [selectedPinIndex, setSelectedPinIndex] = useState<number | null>(null);
  const [activeScopeTab, setActiveScopeTab] = useState<"timing" | "schematic">("timing");

  const triggerUnlock = () => {
    if (isActuating) return;
    setIsActuating(true);
    setWatchdogTime(2500);
  };

  useEffect(() => {
    if (!isActuating) return;
    const interval = setInterval(() => {
      setWatchdogTime((prev) => {
        if (prev <= 100) {
          setIsActuating(false);
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isActuating]);

  const pinouts = [
    {
      pin: "USB-UART (COM)",
      target: "Dell Wyse 5070 Mini PC ↔ Arduino Uno R3",
      voltage: "5V USB / 115200 Baud",
      role: "Node.js serial communication bridge exchanging transaction payloads",
      domain: "5V Digital Logic",
      isolated: true,
    },
    {
      pin: "Digital Pin D7",
      target: "2-Channel Relay IN1 (Optocoupler)",
      voltage: "5V TTL Logic",
      role: "Galvanically isolated trigger energizing primary 12V solenoid lock (Compartment 1)",
      domain: "5V Digital Logic",
      isolated: true,
    },
    {
      pin: "Digital Pin D8",
      target: "2-Channel Relay IN2 (Optocoupler)",
      voltage: "5V TTL Logic",
      role: "Secondary relay channel for auxiliary compartment actuation (Compartment 2)",
      domain: "5V Digital Logic",
      isolated: true,
    },
    {
      pin: "Pins D9 / D10",
      target: "HC-SR04 Ultrasonic Sensor (TRIG/ECHO)",
      voltage: "5V VCC / Ultrasonic Pulse",
      role: "Measures physical drawer fill depth to audit storage capacity and detect tamper",
      domain: "5V Digital Logic",
      isolated: false,
    },
    {
      pin: "USB-HID / ESC/POS",
      target: "GOOJPRT Thermal Receipt Printer",
      voltage: "9V DC / USB Interface",
      role: "Generates Code-128 barcode tracking sticker prior to drawer actuation",
      domain: "Peripheral Bus",
      isolated: true,
    },
    {
      pin: "12V Rail + UPS",
      target: "12V Solenoids + 1N4007 Diode + Fan",
      voltage: "12.0V DC (UPS-backed)",
      role: "Inductive solenoid latch with reverse flyback protection and thermal cooling fan",
      domain: "12V High-Power Inductive",
      isolated: true,
    },
  ];

  return (
    <div className="w-full my-12 rounded-2xl bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none p-6 md:p-8">
      {/* Header with Title and Actuation Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/5">
        <div>
          <span className="text-[#0052FF] dark:text-[#38bdf8] font-mono text-xs uppercase tracking-widest block mb-1 font-semibold">
            Cyber-Physical Hardware Architecture
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-primary font-sans">
            IsKiosk Embedded Actuation &amp; Sensor Subsystem
          </h3>
          <p className="text-xs text-muted font-mono mt-1">
            Galvanic Opto-Isolation • 1N4007 Inductive Flyback Protection • Watchdog Timeout Security
          </p>
        </div>

        {/* Live Actuation Control Deck */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Drawer Selector */}
          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/10 dark:border-white/10 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveDrawer("drawer1")}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeDrawer === "drawer1"
                  ? "bg-[#0052FF] text-white font-semibold"
                  : "text-muted hover:text-primary dark:hover:text-frost"
              }`}
            >
              Ch 1 (Pin D7)
            </button>
            <button
              type="button"
              onClick={() => setActiveDrawer("drawer2")}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeDrawer === "drawer2"
                  ? "bg-[#0052FF] text-white font-semibold"
                  : "text-muted hover:text-primary dark:hover:text-frost"
              }`}
            >
              Ch 2 (Pin D8)
            </button>
          </div>

          {/* Trigger Button */}
          <button
            type="button"
            onClick={triggerUnlock}
            disabled={isActuating}
            className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider font-mono border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              isActuating
                ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "bg-[#0052FF] text-white border-[#0052FF] hover:bg-[#0041cc] shadow-[0_0_15px_rgba(0,82,255,0.25)]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isActuating ? "bg-black animate-ping" : "bg-white"
              }`}
            />
            <span>
              {isActuating
                ? `⚡ Energized (${(watchdogTime / 1000).toFixed(1)}s)`
                : "▶ Trigger Actuation Pulse"}
            </span>
          </button>
        </div>
      </div>

      {/* Visual Interlock State Diagram (4 Core Modules) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Module 1: Dell Wyse Mini PC */}
        <div className="p-4 rounded-xl bg-base/40 border border-black/10 dark:border-white/5 flex flex-col justify-between hover:border-[#0052FF]/50 transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-[#38bdf8] uppercase">
                Host Controller
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] dark:bg-[#38bdf8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF] dark:bg-[#38bdf8]" />
              </span>
            </div>
            <p className="font-bold text-primary text-sm font-sans">
              Dell Wyse 5070 Mini PC
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-sans">
              Drives 15&quot; capacitive touchscreen. Runs Laravel MVC, Laragon local database, and Node.js serial bridge.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-300">
            <span>Offline-First</span>
            <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold">100% LOCAL</span>
          </div>
        </div>

        {/* Module 2: Arduino Uno Controller */}
        <div className="p-4 rounded-xl bg-base/40 border border-black/10 dark:border-white/5 flex flex-col justify-between hover:border-[#0052FF]/50 transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-[#38bdf8] uppercase">
                MCU Controller
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] dark:bg-[#38bdf8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF] dark:bg-[#38bdf8]" />
              </span>
            </div>
            <p className="font-bold text-primary text-sm font-sans">
              Arduino Uno R3
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-sans">
              Processes serial packets, enforces watchdog timers, trips 2-channel relay, and samples HC-SR04 ultrasonic sensors.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-300">
            <span>UART 115200</span>
            <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold">SYNC OK</span>
          </div>
        </div>

        {/* Module 3: 2-Channel Relay & Solenoid */}
        <div
          className={`p-4 rounded-xl border transition-colors duration-200 flex flex-col justify-between ${
            isActuating
              ? "bg-[#0052FF]/15 border-[#0052FF] shadow-[0_0_15px_rgba(0,82,255,0.2)]"
              : "bg-base/40 border-black/10 dark:border-white/5 hover:border-[#0052FF]/50"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-mono font-bold uppercase ${
                  isActuating ? "text-amber-500 dark:text-amber-400" : "text-muted"
                }`}
              >
                2-Ch Relay &amp; Solenoid
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isActuating ? "bg-amber-500 animate-pulse" : "bg-primary/20"
                }`}
              />
            </div>
            <p className="font-bold text-primary text-sm font-sans">
              12V Solenoid DropBox
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-sans">
              Opto-isolated 5V coil triggers heavy-duty 12V fail-secure latch with 1N4007 inductive flyback diode protection.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-600 dark:text-slate-300">Lock State:</span>
            <span
              className={`font-bold ${
                isActuating ? "text-amber-500 dark:text-amber-400" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {isActuating ? "ENERGIZED (OPEN)" : "LATCHED (SECURE)"}
            </span>
          </div>
        </div>

        {/* Module 4: Peripherals & Power */}
        <div className="p-4 rounded-xl bg-base/40 border border-black/10 dark:border-white/5 flex flex-col justify-between hover:border-[#0052FF]/50 transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-[#38bdf8] uppercase">
                Peripherals &amp; UPS
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#0052FF] dark:bg-[#38bdf8]" />
            </div>
            <p className="font-bold text-primary text-sm font-sans">
              GOOJPRT &amp; 1000VA UPS
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-sans">
              GOOJPRT thermal receipt printer, USB 2D QR scanner, 12V cooling fan, and 650–1000 VA battery backup.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-300">
            <span>Thermal + Power</span>
            <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold">REGULATED</span>
          </div>
        </div>
      </div>

      {/* Interactive Cyber-Physical Oscilloscope & Circuit Analyzer */}
      <div className="mb-8 rounded-xl overflow-hidden bg-black/[0.04] dark:bg-base/80 border border-black/10 dark:border-white/10 shadow-sm font-mono flex flex-col">
        {/* Oscilloscope Header / Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-black/[0.03] dark:bg-black/50 border-b border-black/10 dark:border-white/10 text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-primary font-bold tracking-wider uppercase text-[11px]">
              Digital Logic Analyzer Scope // 500MS/s
            </span>
            <span className="text-muted text-[10px]">Timebase: 250ms/div</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-black/10 dark:bg-white/5 p-0.5 rounded-lg border border-black/5 dark:border-white/10 text-[10px]">
              <button
                type="button"
                onClick={() => setActiveScopeTab("timing")}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  activeScopeTab === "timing"
                    ? "bg-[#0052FF] text-white font-semibold"
                    : "text-muted hover:text-primary dark:hover:text-frost"
                }`}
              >
                Waveform Logic Timing
              </button>
              <button
                type="button"
                onClick={() => setActiveScopeTab("schematic")}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  activeScopeTab === "schematic"
                    ? "bg-[#0052FF] text-white font-semibold"
                    : "text-muted hover:text-primary dark:hover:text-frost"
                }`}
              >
                Galvanic Isolation Boundary
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Waveform Logic Timing */}
        {activeScopeTab === "timing" ? (
          <div className="p-4 sm:p-6 bg-[#0a0f1d] text-slate-200">
            {/* Logic Channel Rows */}
            <div className="space-y-4">
              {/* CH1: UART TX Packet Stream */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#38bdf8] font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                    CH 0: UART_TX (COM / 115200 Baud)
                  </span>
                  <span className="text-muted text-[10px]">
                    {isActuating ? "BURST: [0xAA 0x55 0x07 0x01]" : "IDLE HIGH (3.3V)"}
                  </span>
                </div>
                <div className="h-7 w-full bg-slate-900/80 rounded border border-white/10 relative overflow-hidden flex items-center px-2">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 24">
                    {/* Background gridlines */}
                    <line x1="100" y1="0" x2="100" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
                    <line x1="200" y1="0" x2="200" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
                    <line x1="300" y1="0" x2="300" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />

                    {isActuating ? (
                      /* Rapid UART Bit pulses at the beginning */
                      <path
                        d="M 0,4 L 20,4 L 22,20 L 25,4 L 28,20 L 30,4 L 33,20 L 36,4 L 40,20 L 45,4 L 50,4 L 55,20 L 60,4 L 400,4"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                    ) : (
                      /* Idle line */
                      <line x1="0" y1="4" x2="400" y2="4" stroke="#38bdf8" strokeWidth="2" />
                    )}
                  </svg>
                </div>
              </div>

              {/* CH2: Arduino Pin D7/D8 GPIO Out */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    CH 1: MCU_GPIO (Pin {activeDrawer === "drawer1" ? "D7" : "D8"} / TTL 5V)
                  </span>
                  <span className="text-muted text-[10px]">
                    {isActuating ? "STATE: HIGH (+5.0V)" : "STATE: LOW (0.0V)"}
                  </span>
                </div>
                <div className="h-7 w-full bg-slate-900/80 rounded border border-white/10 relative overflow-hidden flex items-center px-2">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 24">
                    <line x1="100" y1="0" x2="100" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
                    <line x1="200" y1="0" x2="200" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
                    <line x1="300" y1="0" x2="300" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />

                    {isActuating ? (
                      /* 2500ms High Pulse */
                      <path
                        d="M 0,20 L 60,20 L 60,4 L 340,4 L 340,20 L 400,20"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="2"
                      />
                    ) : (
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#34d399" strokeWidth="2" />
                    )}
                  </svg>
                </div>
              </div>

              {/* CH3: PC817 Galvanic Optocoupler Output */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    CH 2: OPTOCOUPLER_OUT (PC817 Infrared Latch)
                  </span>
                  <span className="text-muted text-[10px]">
                    {isActuating ? "LED CONDUCTING (5kV ISOLATION)" : "INACTIVE (OPEN CIRCUIT)"}
                  </span>
                </div>
                <div className="h-7 w-full bg-slate-900/80 rounded border border-white/10 relative overflow-hidden flex items-center px-2">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 24">
                    <line x1="100" y1="0" x2="100" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
                    <line x1="200" y1="0" x2="200" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
                    <line x1="300" y1="0" x2="300" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />

                    {isActuating ? (
                      /* Fast Optical Rise */
                      <path
                        d="M 0,20 L 62,20 L 62,4 L 338,4 L 338,20 L 400,20"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="2"
                      />
                    ) : (
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#fbbf24" strokeWidth="2" />
                    )}
                  </svg>
                </div>
              </div>

              {/* CH4: 12V Solenoid Inductive Rail + 1N4007 Diode Clamp */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-rose-400 font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    CH 3: SOLENOID_12V (1N4007 Flyback Clamp)
                  </span>
                  <span className="text-muted text-[10px]">
                    {isActuating
                      ? "12.0V ENERGIZED | CLAMP: 12.7V MAX (0V SPIKE)"
                      : "0.0V (FAIL-SECURE DE-ENERGIZED)"}
                  </span>
                </div>
                <div className="h-7 w-full bg-slate-900/80 rounded border border-white/10 relative overflow-hidden flex items-center px-2">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 24">
                    <line x1="100" y1="0" x2="100" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
                    <line x1="200" y1="0" x2="200" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
                    <line x1="300" y1="0" x2="300" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" />

                    {isActuating ? (
                      /* Step to 12V with slight mechanical contact bounce, then sharp clamp on release */
                      <path
                        d="M 0,20 L 72,20 L 73,6 L 75,10 L 77,4 L 336,4 L 338,2 L 340,16 L 343,20 L 400,20"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2"
                      />
                    ) : (
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#f43f5e" strokeWidth="2" />
                    )}
                  </svg>
                </div>
              </div>
            </div>

            {/* Timebase Axis Legend */}
            <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>t = 0ms</span>
              <span>t = 500ms</span>
              <span>t = 1000ms</span>
              <span>t = 1500ms</span>
              <span>t = 2000ms</span>
              <span>t = 2500ms (Relatch)</span>
            </div>
          </div>
        ) : (
          /* Tab 2: Galvanic Isolation Boundary & Schematic Circuit Flow */
          <div className="p-4 sm:p-6 bg-[#0a0f1d] text-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Left Domain: 5V Logic */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    DOMAIN A: Low-Voltage Digital Logic (5V TTL)
                  </span>
                  <span className="text-[10px] font-mono text-muted">USB Bus Powered</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <p>• Host Controller: Dell Wyse 5070 (x86_64)</p>
                  <p>• Microcontroller: ATmega328P @ 16 MHz</p>
                  <p>• Logic Levels: 0.0V (LOW) to 5.0V (HIGH)</p>
                  <p>• Sensor Bus: HC-SR04 Trig/Echo (5V PWM)</p>
                </div>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300">
                  Protection: Optically decoupled to eliminate voltage spikes from entering MCU ground.
                </div>
              </div>

              {/* Center Galvanic Barrier Marker (Visible on desktop) */}
              <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-10 pointer-events-none">
                <div className="h-full border-r-2 border-dashed border-amber-400/60" />
                <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[9px] uppercase tracking-widest my-auto shadow-sm whitespace-nowrap">
                  5kV Galvanic Barrier
                </span>
                <div className="h-full border-r-2 border-dashed border-amber-400/60" />
              </div>

              {/* Right Domain: 12V High-Power Inductive */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/30 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-rose-400 font-mono">
                    DOMAIN B: High-Power Inductive Load (12V DC)
                  </span>
                  <span className="text-[10px] font-mono text-muted">UPS Battery Backed</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <p>• Inductive Coil: 12V 1.1A Heavy-Duty Solenoid Lock</p>
                  <p>• Relay Contacts: 10A 250VAC Mechanical Switch</p>
                  <p>• Flyback Suppression: 1N4007 Diode (Reverse-biased)</p>
                  <p>• Clamp Limit: Prevents $V = -L (di/dt)$ back-EMF spike</p>
                </div>
                <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono text-rose-300">
                  Reliability: Zero MCU brownouts or memory corruptions recorded over 1,500+ actuations.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Oscilloscope Specs Footer */}
        <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-muted border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
            <span className="text-primary font-medium">Isolation:</span>
            <span className="truncate">PC817 Opto (5kV)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
            <span className="text-primary font-medium">Actuation Time:</span>
            <span className="truncate">12ms (Relay Closure)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
            <span className="text-primary font-medium">Back-EMF Diode:</span>
            <span className="truncate">1N4007 (Clamped 12.7V)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
            <span className="text-primary font-medium">Watchdog:</span>
            <span className="truncate">2500ms Hard Cutoff</span>
          </div>
        </div>
      </div>

      {/* Pinout & Electrical Interface Table (With Interactive Row Selection) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-mono uppercase font-bold text-primary tracking-wider">
            Hardware Pinout &amp; Electrical Interconnect
          </h4>
          <span className="text-[11px] font-mono text-muted">
            Click any pin row to highlight electrical pathway
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/5 shadow-none">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface/80 text-muted border-b border-black/10 dark:border-white/5">
              <tr>
                <th className="py-2.5 px-3">Pin / Bus Interface</th>
                <th className="py-2.5 px-3">Target Subsystem</th>
                <th className="py-2.5 px-3">Signal / Voltage</th>
                <th className="py-2.5 px-3">Isolation Domain</th>
                <th className="py-2.5 px-3">Function in Cyber-Physical Architecture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 bg-base/40">
              {pinouts.map((p, idx) => {
                const isSelected = selectedPinIndex === idx;
                return (
                  <tr
                    key={idx}
                    onClick={() => setSelectedPinIndex(isSelected ? null : idx)}
                    className={`transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#0052FF]/15 dark:bg-[#38bdf8]/15"
                        : "hover:bg-[#0052FF]/5 dark:hover:bg-[#38bdf8]/5"
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-[#0052FF] dark:text-[#38bdf8] whitespace-nowrap">
                      {p.pin}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-primary">
                      {p.target}
                    </td>
                    <td className="py-2.5 px-3 text-muted whitespace-nowrap">{p.voltage}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          p.domain.includes("12V")
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {p.domain}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-muted">{p.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
