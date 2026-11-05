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
    <div className="w-full my-12 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/10">
        <div>
          <span className="text-orange-700 dark:text-orange font-mono text-xs uppercase tracking-widest block mb-1">
            Cyber-Physical Hardware Architecture
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            IsKiosk Embedded Actuation &amp; Sensor Subsystem
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Module 1: Dell Wyse Mini PC */}
        <div className="p-4 rounded-lg bg-white/70 dark:bg-black/30 border border-black/10 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                Host Controller
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              Dell Wyse 5070 Mini PC
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Drives 15&quot; capacitive touchscreen. Runs Laravel MVC, Laragon local database, and Node.js serial bridge.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Offline-First</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% LOCAL</span>
          </div>
        </div>

        {/* Module 2: Arduino Uno Controller */}
        <div className="p-4 rounded-lg bg-white/70 dark:bg-black/30 border border-black/10 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                MCU Controller
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 dark:bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400"></span>
              </span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              Arduino Uno R3
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Processes serial packets, enforces watchdog timers, trips 2-channel relay, and samples HC-SR04 ultrasonic sensors.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>UART 115200</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">SYNC OK</span>
          </div>
        </div>

        {/* Module 3: 2-Channel Relay & Solenoid */}
        <div
          className={`p-4 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
            isUnlocked
              ? "bg-orange-500/10 border-orange shadow-md"
              : "bg-white/70 dark:bg-black/30 border-black/10 dark:border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-mono font-bold uppercase ${
                  isUnlocked ? "text-orange-700 dark:text-orange" : "text-slate-500"
                }`}
              >
                2-Ch Relay &amp; Solenoid
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isUnlocked ? "bg-orange animate-pulse" : "bg-slate-400"
                }`}
              />
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              12V Solenoid DropBox
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Opto-isolated 5V coil triggers heavy-duty 12V fail-secure latch with 1N4007 inductive flyback diode protection.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Lock State:</span>
            <span
              className={`font-bold ${
                isUnlocked ? "text-orange-700 dark:text-orange" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {isUnlocked ? "ENERGIZED (OPEN)" : "LATCHED (SECURE)"}
            </span>
          </div>
        </div>

        {/* Module 4: Peripherals & Power */}
        <div className="p-4 rounded-lg bg-white/70 dark:bg-black/30 border border-black/10 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                Peripherals &amp; UPS
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              GOOJPRT &amp; 1000VA UPS
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              GOOJPRT thermal receipt printer, USB 2D QR scanner, 12V cooling fan, and 650–1000 VA battery backup.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Thermal + Power</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">REGULATED</span>
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
                <th className="py-2.5 px-3">Pin / Bus Interface</th>
                <th className="py-2.5 px-3">Target Subsystem</th>
                <th className="py-2.5 px-3">Signal / Voltage</th>
                <th className="py-2.5 px-3">Function in Cyber-Physical Architecture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 bg-white/40 dark:bg-black/20">
              {pinouts.map((p, idx) => (
                <tr key={idx} className="hover:bg-blue-600/5 dark:hover:bg-blue-400/5 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-orange-700 dark:text-orange">{p.pin}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {p.target}
                  </td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{p.voltage}</td>
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
