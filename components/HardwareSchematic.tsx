"use client";

import React, { useState } from "react";

export default function HardwareSchematic() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const triggerUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      setIsUnlocked(false);
    }, 2800);
  };

  const pinouts = [
    {
      pin: "USB-UART (COM)",
      target: "Dell Wyse 5070 Mini PC ↔ Arduino Uno R3",
      voltage: "5V USB / 115200 Baud",
      role: "Node.js serial communication bridge exchanging transaction payloads",
    },
    {
      pin: "Digital Pin D7",
      target: "2-Channel Relay IN1 (Optocoupler)",
      voltage: "5V TTL Logic",
      role: "Galvanically isolated trigger energizing primary 12V solenoid lock",
    },
    {
      pin: "Digital Pin D8",
      target: "2-Channel Relay IN2 (Optocoupler)",
      voltage: "5V TTL Logic",
      role: "Secondary relay channel for auxiliary compartment actuation",
    },
    {
      pin: "Pins D9 / D10",
      target: "HC-SR04 Ultrasonic Sensor (TRIG/ECHO)",
      voltage: "5V VCC / Ultrasonic Pulse",
      role: "Measures physical drawer fill depth to audit storage capacity",
    },
    {
      pin: "USB-HID / ESC/POS",
      target: "GOOJPRT Thermal Receipt Printer",
      voltage: "9V DC / USB Interface",
      role: "Generates Code-128 barcode tracking sticker prior to drawer actuation",
    },
    {
      pin: "12V Rail + UPS",
      target: "12V Solenoids + 1N4007 Diode + Fan",
      voltage: "12.0V DC (UPS-backed)",
      role: "Inductive solenoid latch with reverse flyback protection and thermal fan",
    },
  ];

  return (
    <div className="w-full my-12 rounded-2xl bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/5">
        <div>
          <span className="text-[#0052FF] dark:text-[#38bdf8] font-mono text-xs uppercase tracking-widest block mb-1 font-semibold">
            Cyber-Physical Hardware Architecture
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-primary">
            IsKiosk Embedded Actuation &amp; Sensor Subsystem
          </h3>
        </div>
        <button
          type="button"
          onClick={triggerUnlock}
          className={`self-start sm:self-auto px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider font-mono border transition-colors duration-200 cursor-pointer shadow-none ${
            isUnlocked
              ? "bg-amber-500 text-black border-amber-500"
              : "bg-[#0052FF] text-white border-[#0052FF] hover:bg-[#0052FF]/90"
          }`}
        >
          {isUnlocked ? "⚡ Relay Energized" : "▶ Simulate Drawer Unlock"}
        </button>
      </div>

      {/* Visual Interlock State Diagram (Blueprint 1px Lines, Zero Drop Shadows) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Module 1: Dell Wyse Mini PC */}
        <div className="p-4 rounded-xl bg-base/40 border border-black/10 dark:border-white/5 shadow-none flex flex-col justify-between hover:border-[#0052FF]/50 dark:hover:border-[#38bdf8]/50 transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-[#38bdf8] uppercase">
                Host Controller
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] dark:bg-[#38bdf8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF] dark:bg-[#38bdf8]"></span>
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
        <div className="p-4 rounded-xl bg-base/40 border border-black/10 dark:border-white/5 shadow-none flex flex-col justify-between hover:border-[#0052FF]/50 dark:hover:border-[#38bdf8]/50 transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-[#38bdf8] uppercase">
                MCU Controller
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] dark:bg-[#38bdf8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF] dark:bg-[#38bdf8]"></span>
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
          className={`p-4 rounded-xl border transition-colors duration-200 flex flex-col justify-between shadow-none ${
            isUnlocked
              ? "bg-[#0052FF]/15 border-[#0052FF]"
              : "bg-base/40 border-black/10 dark:border-white/5 hover:border-[#0052FF]/50"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-mono font-bold uppercase ${
                  isUnlocked ? "text-amber-500 dark:text-amber-400" : "text-muted"
                }`}
              >
                2-Ch Relay &amp; Solenoid
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isUnlocked ? "bg-amber-500 animate-pulse" : "bg-primary/20"
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
                isUnlocked ? "text-amber-500 dark:text-amber-400" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {isUnlocked ? "ENERGIZED (OPEN)" : "LATCHED (SECURE)"}
            </span>
          </div>
        </div>

        {/* Module 4: Peripherals & Power */}
        <div className="p-4 rounded-xl bg-base/40 border border-black/10 dark:border-white/5 shadow-none flex flex-col justify-between hover:border-[#0052FF]/50 dark:hover:border-[#38bdf8]/50 transition-colors duration-200">
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

      {/* Pinout & Electrical Interface Table (Flat Blueprint Table) */}
      <div>
        <h4 className="text-xs font-mono uppercase font-bold text-primary tracking-wider mb-3">
          Hardware Pinout &amp; Electrical Interconnect
        </h4>
        <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/5 shadow-none">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface/80 text-muted border-b border-black/10 dark:border-white/5">
              <tr>
                <th className="py-2.5 px-3">Pin / Bus Interface</th>
                <th className="py-2.5 px-3">Target Subsystem</th>
                <th className="py-2.5 px-3">Signal / Voltage</th>
                <th className="py-2.5 px-3">Function in Cyber-Physical Architecture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 bg-base/40">
              {pinouts.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#0052FF]/5 transition-colors duration-200">
                  <td className="py-2.5 px-3 font-bold text-[#0052FF]">{p.pin}</td>
                  <td className="py-2.5 px-3 font-semibold text-primary">
                    {p.target}
                  </td>
                  <td className="py-2.5 px-3 text-muted">{p.voltage}</td>
                  <td className="py-2.5 px-3 text-muted">
                    {p.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
