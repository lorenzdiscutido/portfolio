"use client";

import React, { useState, useEffect, useRef } from "react";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    const cmd = trimmed.toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-orange font-bold">&gt; Available commands:</p>
            <p>
              &gt; <span className="text-blue">whoami</span> — Display operator identity &amp; title
            </p>
            <p>
              &gt; <span className="text-blue">skills</span> — Categorized technical capabilities
            </p>
            <p>
              &gt; <span className="text-blue">experience</span> — Current &amp; previous engineering roles
            </p>
            <p>
              &gt; <span className="text-blue">education</span> — Academic degree &amp; institution
            </p>
            <p>
              &gt; <span className="text-blue">neofetch</span> — Display workstation telemetry
            </p>
            <p>
              &gt; <span className="text-blue">tailscale</span> — Inspect active Tailnet mesh nodes
            </p>
            <p>
              &gt; <span className="text-blue">clear</span> — Clear terminal output
            </p>
          </div>
        );
        break;
      case "whoami":
        output = (
          <div className="space-y-0.5 font-mono py-0.5">
            <p className="text-blue font-bold">&gt; Engr. Jose Lorenzo Miguel Discutido</p>
            <p className="text-slate-700 dark:text-slate-300">
              &gt; Data and Systems Engineer
            </p>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="space-y-1 font-mono py-1 text-xs">
            <p>
              <span className="text-blue font-bold">&gt; Core &amp; Web:</span>{" "}
              <span className="text-slate-800 dark:text-slate-200">
                Python, Next.js, TypeScript, Tailwind CSS
              </span>
            </p>
            <p>
              <span className="text-blue font-bold">&gt; Hardware &amp; Mobile:</span>{" "}
              <span className="text-slate-800 dark:text-slate-200">
                C/C++, Dart, Flutter
              </span>
            </p>
            <p>
              <span className="text-blue font-bold">&gt; Cloud &amp; Enterprise:</span>{" "}
              <span className="text-slate-800 dark:text-slate-200">
                Microsoft Entra ID, Microsoft Intune, SharePoint, Odoo ERP, Firebase
              </span>
            </p>
            <p>
              <span className="text-blue font-bold">&gt; Database &amp; Network:</span>{" "}
              <span className="text-slate-800 dark:text-slate-200">
                MySQL, PostgreSQL, Prisma ORM, Tailscale
              </span>
            </p>
          </div>
        );
        break;
      case "experience":
        output = (
          <div className="space-y-1 font-mono py-1 text-xs">
            <p>
              <span className="text-orange font-bold">&gt; Current:</span>{" "}
              <span className="text-slate-800 dark:text-slate-200">
                Digital Data &amp; Systems Engineer and AI/IoT Data Officer @ Vonotec
              </span>
            </p>
            <p>
              <span className="text-blue font-bold">&gt; Previous:</span>{" "}
              <span className="text-slate-800 dark:text-slate-200">
                IT Systems &amp; Network Intern @ PHINMA Properties
              </span>
            </p>
          </div>
        );
        break;
      case "education":
        output = (
          <div className="space-y-0.5 font-mono py-1 text-xs">
            <p className="text-slate-900 dark:text-white font-bold">
              &gt; Bachelor of Science in Computer Engineering
            </p>
            <p className="text-blue font-semibold">
              &gt; Polytechnic University of the Philippines (PUP)
            </p>
          </div>
        );
        break;
      case "neofetch":
      case "fastfetch":
        output = (
          <div className="space-y-0.5 py-1">
            <p className="text-orange font-bold">guest@jld-stealth-rig</p>
            <p>-------------------------</p>
            <p>
              <span className="text-blue">OS:</span> Linux / Windows 11 Pro (WSL2)
            </p>
            <p>
              <span className="text-blue">Chassis:</span> Stealth All-Black / Zero-RGB Build
            </p>
            <p>
              <span className="text-blue">Acoustics:</span> &lt; 22 dBA Silent Fan Curve
            </p>
            <p>
              <span className="text-blue">Role:</span> Digital Data &amp; Systems Engineer @ Vonotec
            </p>
            <p>
              <span className="text-blue">Education:</span> BS Computer Engineering (PUP)
            </p>
            <p>
              <span className="text-blue">Tailnet:</span> 4 Nodes Online (WireGuard Mesh OK)
            </p>
          </div>
        );
        break;
      case "tailscale":
      case "tailscale status":
        output = (
          <div className="space-y-1 py-1 text-xs font-mono">
            <p className="text-orange font-bold">IPv4         HOSTNAME               ROLE                  STATUS</p>
            <p>
              <span className="text-blue">100.64.0.1</span>   vonotec-cluster-alpha  MySQL Master A (Odd)  online, direct
            </p>
            <p>
              <span className="text-blue">100.64.0.2</span>   iskiosk-mcu-gateway    MCU Hardware Interlock online, direct
            </p>
            <p>
              <span className="text-blue">100.64.0.3</span>   entra-id-governance    Identity Proxy (MSAL) online, direct
            </p>
            <p>
              <span className="text-blue">100.64.0.4</span>   jld-stealth-rig        Workstation (Linux)   active, local
            </p>
          </div>
        );
        break;
      case "zzz":
      case "synergy":
        output = (
          <div className="space-y-1 py-1">
            <p className="text-orange font-bold">[Zenless Zone Zero // Combat Analytics Log]</p>
            <p>
              • <span className="text-blue">Anomaly Buildup &amp; Disorder</span> ↔ Event stream buffer thresholds &amp; state flushes
            </p>
            <p>
              • <span className="text-blue">Stun Daze Window</span> ↔ Burst throughput window during low-contention locks
            </p>
            <p>
              • <span className="text-blue">Quick Assist Rotations</span> ↔ Zero-downtime node handoffs in distributed pipelines
            </p>
          </div>
        );
        break;
      case "sudo":
        output = (
          <span>
            <span className="text-blue">Permission denied.</span> This incident will be reported.
          </span>
        );
        break;
      default:
        output = (
          <span>
            Command not found. Type &apos;<span className="text-blue">help</span>&apos; for available commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-[#1e2128]/90 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-lg text-xs font-mono text-slate-800 dark:text-slate-200 hover:border-orange dark:hover:border-orange hover:text-orange dark:hover:text-orange transition-all cursor-pointer flex items-center gap-2 group"
        aria-label="Open Interactive Terminal"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange"></span>
        </span>
        <span className="font-bold">&gt;_ Terminal</span>
        <span className="hidden sm:inline text-[10px] text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">
          Ctrl+`
        </span>
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="fixed bottom-4 right-4 md:bottom-10 md:right-10 w-[calc(100vw-32px)] max-w-lg h-80 bg-white/95 dark:bg-[#15181e]/95 backdrop-blur-xl border border-black/10 dark:border-white/20 rounded-xl shadow-2xl overflow-y-auto font-mono text-sm p-4 z-50 cursor-text transition-all"
    >
      <div className="mb-3 pb-2 border-b border-black/10 dark:border-white/10 flex justify-between items-center text-xs">
        <span className="text-slate-600 dark:text-slate-300 font-bold">
          jld-sys terminal (Ctrl + ` to toggle)
        </span>
        <div className="flex items-center gap-3">
          <span className="text-blue font-bold">bash</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="p-1 hover:text-orange text-slate-500 dark:text-slate-400 transition-colors cursor-pointer font-bold font-mono text-xs"
            aria-label="Close Terminal"
          >
            [x]
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-orange font-bold">guest@jld-sys:~$</span>
              <span className="text-slate-900 dark:text-white">{entry.command}</span>
            </div>
            <div className="text-slate-700 dark:text-slate-300 pl-2">{entry.output}</div>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="text-orange font-bold">guest@jld-sys:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDownInput}
            className="flex-1 bg-transparent text-slate-900 dark:text-white outline-none border-none caret-orange font-mono"
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
