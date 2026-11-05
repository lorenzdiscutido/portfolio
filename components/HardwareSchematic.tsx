"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HardwareSchematic() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const triggerUnlock = () => {
    setIsUnlocked(true);
    setPulseCount((c) => c + 1);
    setTimeout(() => {
      setIsUnlocked(false);
    }, 2800);
  };

  const pinouts = [
    {
      pin: "GPIO 16 (TX2)",
      target: "Thermal Printer RX",
      voltage: "3.3V Logic (TTL)",
      role: "Transmits ESC/POS barcode generation & print streams",
    },
    {
      pin: "GPIO 17 (RX2)",
      target: "Thermal Printer TX",
      voltage: "3.3V Logic (TTL)",
      role: "Receives paper-out and buffer readiness status codes",
    },
    {
      pin: "GPIO 22 (DO)",
      target: "Optocoupler IN (PC817)",
      voltage: "3.3V -> 5V Opto",
      role: "Galvanically isolated drive signal to energize 12V relay",
    },
    {
      pin: "GPIO 23 (DI)",
      target: "Magnetic Reed Switch",
      voltage: "3.3V Internal Pull-Up",
      role: "Hardware interrupt sensing drawer physical closure state",
    },
    {
      pin: "12V VCC Rail",
      target: "Solenoid Coil + 1N4007",
      voltage: "12.0V DC (2.0A peak)",
      role: "Inductive solenoid latch with reverse flyback diode protection",
    },
  ];

  return (
    <div className="w-full my-12 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/10">
        <div>
          <span className="text-orange-700 dark:text-orange font-mono text-xs uppercase tracking-widest block mb-1">
            Physical Hardware Co-Design
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            MCU Hardware Interlock &amp; Solenoid Circuit
          </h3>
        </div>
        <button
          type="button"
          onClick={triggerUnlock}
          className="self-start sm:self-auto px-4 py-2 rounded-lg bg-orange text-black font-bold text-xs uppercase tracking-wider font-mono shadow-[3px_3px_0px_0px_#000000] hover:shadow-[1px_1px_0px_0px_#000000] active:shadow-none transition-all cursor-pointer"
        >
          {isUnlocked ? "⚡ Relay Energized" : "▶ Simulate Drawer Unlock"}
        </button>
      </div>

      {/* Visual Interlock State Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Module 1: Logic Control */}
        <div className="p-4 rounded-lg bg-white/70 dark:bg-black/30 border border-black/10 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue uppercase">
                MCU Controller
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue"></span>
              </span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              Watchdog &amp; UART Engine
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Enforces 3000ms stuck-open safety cutoff and verifies CRC-16 command signatures.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Core Logic: 3.3V</span>
            <span className="text-blue font-bold">ARMED</span>
          </div>
        </div>

        {/* Module 2: Galvanic Isolation Relay */}
        <div
          className={`p-4 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
            isUnlocked
              ? "bg-orange/10 border-orange shadow-md"
              : "bg-white/70 dark:bg-black/30 border-black/10 dark:border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-mono font-bold uppercase ${
                  isUnlocked ? "text-orange" : "text-slate-500"
                }`}
              >
                Opto Relay Stage
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isUnlocked ? "bg-orange animate-pulse" : "bg-slate-400"
                }`}
              />
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              PC817 + 5V Coil Driver
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Provides galvanic isolation protecting the digital MCU rail from 12V inductive spikes.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Relay State:</span>
            <span
              className={`font-bold ${
                isUnlocked ? "text-orange" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {isUnlocked ? "CLOSED (TRIGGERED)" : "OPEN (DISARMED)"}
            </span>
          </div>
        </div>

        {/* Module 3: Physical Actuator */}
        <div
          className={`p-4 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
            isUnlocked
              ? "bg-emerald-500/10 border-emerald-500 shadow-md"
              : "bg-white/70 dark:bg-black/30 border-black/10 dark:border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-mono font-bold uppercase ${
                  isUnlocked ? "text-emerald-500" : "text-slate-500"
                }`}
              >
                Solenoid Drawer
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isUnlocked ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              12V Heavy-Duty Solenoid
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Spring-loaded latch retracts upon 12V energization. Reed sensor confirms return stroke.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Latch Status:</span>
            <span
              className={`font-bold ${
                isUnlocked ? "text-emerald-500" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {isUnlocked ? "UNLOCKED (REED OPEN)" : "LOCKED (SECURED)"}
            </span>
          </div>
        </div>
      </div>

      {/* Pinout & Electrical Interface Table */}
      <div>
        <h4 className="text-xs font-mono uppercase font-bold text-slate-700 dark:text-slate-300 tracking-wider mb-3">
          Hardware Pinout &amp; Electrical Interconnect
        </h4>
        <div className="overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-slate-300 border-b border-black/10 dark:border-white/10">
              <tr>
                <th className="py-2.5 px-3">Pin / Terminal</th>
                <th className="py-2.5 px-3">Target Subsystem</th>
                <th className="py-2.5 px-3">Signal / Voltage</th>
                <th className="py-2.5 px-3">Interlock Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 bg-white/40 dark:bg-black/20">
              {pinouts.map((p, idx) => (
                <tr key={idx} className="hover:bg-blue/5 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-orange-700 dark:text-orange">{p.pin}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {p.target}
                  </td>
                  <td className="py-2.5 px-3 text-blue">{p.voltage}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
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
