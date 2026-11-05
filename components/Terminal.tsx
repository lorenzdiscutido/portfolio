"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface HistoryEntry {
  id: string;
  command: string;
  output: React.ReactNode;
}

function djb2(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return (hash >>> 0).toString(16);
}

export default function Terminal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [input, setInput] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerIdsRef = useRef<NodeJS.Timeout[]>([]);
  const isExecutingRef = useRef<boolean>(false);
  const activeExecutionRef = useRef<{
    entryId: string;
    currentLines: { text: string; isStats?: boolean }[];
    targetIP: string;
  } | null>(null);

  const renderPingOutput = (lines: { text: string; isStats?: boolean }[]) => (
    <div className="space-y-0.5 font-mono text-xs py-1">
      {lines.map((item, idx) => (
        <p key={idx} className={item.isStats ? "pt-2" : ""}>
          {item.text}
        </p>
      ))}
    </div>
  );

  const cancelExecution = () => {
    timerIdsRef.current.forEach((t) => clearTimeout(t));
    timerIdsRef.current = [];
    if (activeExecutionRef.current) {
      const { entryId, currentLines } = activeExecutionRef.current;
      currentLines.push({ text: "^C" });
      setHistory((prev) =>
        prev.map((entry) =>
          entry.id === entryId
            ? { ...entry, output: renderPingOutput([...currentLines]) }
            : entry
        )
      );
      activeExecutionRef.current = null;
    }
    setIsExecuting(false);
    isExecutingRef.current = false;
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
        if (isExecutingRef.current) {
          e.preventDefault();
          cancelExecution();
        }
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
      timerIdsRef.current.forEach((t) => clearTimeout(t));
      timerIdsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (isOpen && !isExecuting) {
      inputRef.current?.focus();
    }
  }, [isOpen, isExecuting]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isOpen, isExecuting]);

  const startPing = (rawCmd: string, targetIP: string) => {
    const validIPs = ["100.64.0.1", "100.64.0.2", "100.64.0.3", "100.64.0.4"];
    const isValid = validIPs.includes(targetIP);

    setIsExecuting(true);
    isExecutingRef.current = true;

    const headerLine = `PING ${targetIP} (${targetIP}) 56(84) bytes of data.`;
    const sequence: { text: string; delay: number; isStats?: boolean }[] = isValid
      ? [
          { text: `64 bytes from ${targetIP}: icmp_seq=1 ttl=64 time=18.4 ms`, delay: 550 },
          { text: `64 bytes from ${targetIP}: icmp_seq=2 ttl=64 time=19.1 ms`, delay: 1100 },
          { text: `64 bytes from ${targetIP}: icmp_seq=3 ttl=64 time=18.8 ms`, delay: 1650 },
          { text: `--- ${targetIP} ping statistics ---`, delay: 2150, isStats: true },
          { text: `3 packets transmitted, 3 received, 0% packet loss, time 2003ms`, delay: 2200 },
        ]
      : [
          { text: `From ${targetIP} icmp_seq=1 Destination Host Unreachable`, delay: 550 },
          { text: `From ${targetIP} icmp_seq=2 Destination Host Unreachable`, delay: 1100 },
          { text: `From ${targetIP} icmp_seq=3 Destination Host Unreachable`, delay: 1650 },
          { text: `--- ${targetIP} ping statistics ---`, delay: 2150, isStats: true },
          { text: `3 packets transmitted, 0 received, +3 errors, 100% packet loss, time 3014ms`, delay: 2200 },
        ];

    const currentLines: { text: string; isStats?: boolean }[] = [{ text: headerLine }];
    const entryId = `ping-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    activeExecutionRef.current = {
      entryId,
      currentLines,
      targetIP,
    };

    setHistory((prev) => [
      ...prev,
      {
        id: entryId,
        command: rawCmd,
        output: renderPingOutput(currentLines),
      },
    ]);

    sequence.forEach((item, index) => {
      const timer = setTimeout(() => {
        currentLines.push(item);
        setHistory((prev) =>
          prev.map((entry) =>
            entry.id === entryId
              ? { ...entry, output: renderPingOutput([...currentLines]) }
              : entry
          )
        );

        if (index === sequence.length - 1) {
          activeExecutionRef.current = null;
          setIsExecuting(false);
          isExecutingRef.current = false;
          setTimeout(() => inputRef.current?.focus(), 50);
        }
      }, item.delay);

      timerIdsRef.current.push(timer);
    });
  };

  const scheduleNavigation = (path: string) => {
    const timer = setTimeout(() => {
      router.push(path);
    }, 500);
    timerIdsRef.current.push(timer);
  };

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (trimmed) {
      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);
    }
    const parts = trimmed.split(/\s+/);
    const primaryCmd = parts[0]?.toLowerCase() || "";
    const arg = parts[1];

    if (primaryCmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;

    switch (primaryCmd) {
      case "help":
        output = (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-orange font-bold">&gt; Available commands:</p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">whoami</span> — Display operator identity &amp; title
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">skills</span> — Categorized technical capabilities
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">experience</span> — Current &amp; previous engineering roles
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">education</span> — Academic degree &amp; institution
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">neofetch</span> — Display workstation telemetry
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">tailscale</span> — Inspect active Tailnet mesh nodes
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">ping &lt;ip&gt;</span> — Test ICMP echo reachability
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">cd &lt;dir&gt;</span> — Navigate to projects (komunikonek, iskiosk, vonotec, ~)
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">ls</span> — List navigable project directories
            </p>
            <p>
              &gt; <span className="text-blue-600 dark:text-blue-400">clear</span> — Clear terminal output
            </p>
          </div>
        );
        break;
      case "whoami":
        output = (
          <div className="space-y-0.5 font-mono py-0.5">
            <p className="text-blue-600 dark:text-blue-400 font-bold">&gt; Engr. Jose Lorenzo Miguel Discutido</p>
            <p className="text-slate-300">
              &gt; Data and Systems Engineer
            </p>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="space-y-1 font-mono py-1 text-xs">
            <p>
              <span className="text-blue-600 dark:text-blue-400 font-bold">&gt; Core &amp; Web:</span>{" "}
              <span className="text-slate-200">
                Python, Next.js, TypeScript, Tailwind CSS
              </span>
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400 font-bold">&gt; Hardware &amp; Mobile:</span>{" "}
              <span className="text-slate-200">
                C/C++, Dart, Flutter
              </span>
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400 font-bold">&gt; Cloud &amp; Enterprise:</span>{" "}
              <span className="text-slate-200">
                Microsoft Entra ID, Microsoft Intune, SharePoint, Odoo ERP, Firebase
              </span>
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400 font-bold">&gt; Database &amp; Network:</span>{" "}
              <span className="text-slate-200">
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
              <span className="text-slate-200">
                Digital Data &amp; Systems Engineer and AI/IoT Data Officer @ Vonotec
              </span>
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400 font-bold">&gt; Previous:</span>{" "}
              <span className="text-slate-200">
                IT Systems &amp; Network Intern @ PHINMA Properties
              </span>
            </p>
          </div>
        );
        break;
      case "education":
        output = (
          <div className="space-y-0.5 font-mono py-1 text-xs">
            <p className="text-white font-bold">
              &gt; Bachelor of Science in Computer Engineering
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
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
              <span className="text-blue-600 dark:text-blue-400">OS:</span> Linux / Windows 11 Pro (WSL2)
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">Chassis:</span> Stealth All-Black / Zero-RGB Build
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">Acoustics:</span> &lt; 22 dBA Silent Fan Curve
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">Role:</span> Digital Data &amp; Systems Engineer @ Vonotec
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">Education:</span> BS Computer Engineering (PUP)
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">Tailnet:</span> 4 Nodes Online (WireGuard Mesh OK)
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
              <span className="text-blue-600 dark:text-blue-400">100.64.0.1</span>   vonotec-cluster-alpha  MySQL Master A (Odd)  online, direct
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">100.64.0.2</span>   iskiosk-mcu-gateway    MCU Hardware Interlock online, direct
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">100.64.0.3</span>   entra-id-governance    Identity Proxy (MSAL) online, direct
            </p>
            <p>
              <span className="text-blue-600 dark:text-blue-400">100.64.0.4</span>   jld-stealth-rig        Workstation (Linux)   active, local
            </p>
          </div>
        );
        break;
      case "ping": {
        if (!arg) {
          output = (
            <p className="font-mono text-xs text-orange">Usage: ping &lt;ip_address&gt;</p>
          );
          break;
        }
        startPing(rawCmd, arg);
        return;
      }
      case "cd": {
        const rawTarget = (arg || "").trim();
        const target = rawTarget.toLowerCase().replace(/\/+$/, "");

        if (!target || target === "~" || rawTarget === "/") {
          output = (
            <p className="font-mono text-xs text-blue-600 dark:text-blue-400">&gt; Navigating to /home...</p>
          );
          scheduleNavigation("/");
          break;
        }

        if (target === "..") {
          output = (
            <p className="font-mono text-xs text-blue-600 dark:text-blue-400">&gt; Navigating back...</p>
          );
          scheduleNavigation("/");
          break;
        }

        if (
          target === "komunikonek" ||
          target === "projects/komunikonek" ||
          djb2(target) === "66b43384"
        ) {
          output = (
            <p className="font-mono text-xs text-blue-600 dark:text-blue-400">&gt; Navigating to /projects/komunikonek...</p>
          );
          scheduleNavigation("/projects/komunikonek");
          break;
        }

        if (
          target === "iskiosk" ||
          target === "iskiosk-terminal" ||
          target === "projects/iskiosk-terminal"
        ) {
          output = (
            <p className="font-mono text-xs text-blue-600 dark:text-blue-400">&gt; Navigating to /projects/iskiosk-terminal...</p>
          );
          scheduleNavigation("/projects/iskiosk-terminal");
          break;
        }

        if (
          target === "vonotec" ||
          target === "vonotec-defect-logger" ||
          target === "gemini" ||
          target === "gemini-defect-logger" ||
          target === "projects/vonotec-defect-logger"
        ) {
          output = (
            <p className="font-mono text-xs text-blue-600 dark:text-blue-400">&gt; Navigating to /projects/vonotec-defect-logger...</p>
          );
          scheduleNavigation("/projects/vonotec-defect-logger");
          break;
        }

        output = (
          <p className="font-mono text-xs text-orange">cd: {arg}: No such file or directory</p>
        );
        break;
      }
      case "ls":
      case "dir":
        output = (
          <div className="space-y-1 font-mono text-xs py-0.5">
            <p className="text-blue-600 dark:text-blue-400 font-bold">drwxr-xr-x  projects/</p>
            <div className="pl-4 space-y-0.5 text-slate-200">
              <p>&gt; <span className="text-orange font-semibold">vonotec/</span> — Vonotec Automated Defect Logger</p>
              <p>&gt; <span className="text-orange font-semibold">iskiosk/</span> — IsKiosk: Document Management System</p>
              <p>&gt; <span className="text-orange font-semibold">komunikonek/</span> — Komunikonek Mobile Dashboard</p>
            </div>
            <p className="text-slate-500 pt-1 text-[11px]">&gt; Tip: Use &apos;<span className="text-blue-600 dark:text-blue-400">cd &lt;dir&gt;</span>&apos; to navigate.</p>
          </div>
        );
        break;
      case "zzz":
      case "synergy":
        output = (
          <div className="space-y-1 py-1">
            <p className="text-orange font-bold">[Zenless Zone Zero // Combat Analytics Log]</p>
            <p>
              • <span className="text-blue-600 dark:text-blue-400">Anomaly Buildup &amp; Disorder</span> ↔ Event stream buffer thresholds &amp; state flushes
            </p>
            <p>
              • <span className="text-blue-600 dark:text-blue-400">Stun Daze Window</span> ↔ Burst throughput window during low-contention locks
            </p>
            <p>
              • <span className="text-blue-600 dark:text-blue-400">Quick Assist Rotations</span> ↔ Zero-downtime node handoffs in distributed pipelines
            </p>
          </div>
        );
        break;
      case "sudo":
        output = (
          <span>
            <span className="text-blue-600 dark:text-blue-400">Permission denied.</span> This incident will be reported.
          </span>
        );
        break;
      default:
        if (djb2(primaryCmd) === "66b43384") {
          output = (
            <p className="font-mono text-xs text-blue-600 dark:text-blue-400">&gt; Navigating to /projects/komunikonek...</p>
          );
          scheduleNavigation("/projects/komunikonek");
          break;
        }
        output = (
          <span>
            Command not found. Type &apos;<span className="text-blue-600 dark:text-blue-400">help</span>&apos; for available commands.
          </span>
        );
        break;
    }

    const entryId = `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setHistory((prev) => [...prev, { id: entryId, command: rawCmd, output }]);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isExecuting) return;

    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx =
        historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] || "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIdx === -1) return;
      if (historyIdx >= cmdHistory.length - 1) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx] || "");
      }
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const raw = input.trimStart().toLowerCase();
      if (!raw) return;

      const commands = [
        "help",
        "whoami",
        "skills",
        "experience",
        "education",
        "neofetch",
        "tailscale",
        "ping ",
        "cd ",
        "ls",
        "clear",
      ];

      if (raw.startsWith("cd ")) {
        const sub = raw.slice(3).trim();
        const dirs = ["vonotec", "iskiosk", "komunikonek", "~"];
        const match = dirs.find((d) => d.startsWith(sub));
        if (match) setInput(`cd ${match}`);
        return;
      }

      const match = commands.find((c) => c.startsWith(raw));
      if (match) setInput(match);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 px-3.5 py-2 rounded-xl bg-[#1e2128]/90 text-slate-200 backdrop-blur-md border border-white/20 shadow-lg text-xs font-mono hover:border-orange hover:text-orange transition-all cursor-pointer flex items-center gap-2 group"
        aria-label="Open Interactive Terminal"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange"></span>
        </span>
        <span className="font-bold">&gt;_ Terminal</span>
        <span className="hidden sm:inline text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded">
          Ctrl+`
        </span>
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={() => !isExecuting && inputRef.current?.focus()}
      className="dark fixed bottom-4 right-4 md:bottom-10 md:right-10 w-[calc(100vw-32px)] max-w-lg h-80 bg-[#15181e]/95 text-slate-200 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-y-auto font-mono text-sm p-4 z-50 cursor-text transition-all"
    >
      <div className="mb-3 pb-2 border-b border-white/10 flex justify-between items-center text-xs">
        <span className="text-slate-300 font-bold">
          jld-sys terminal (Ctrl + ` to toggle)
        </span>
        <div className="flex items-center gap-3">
          <span className="text-blue-600 dark:text-blue-400 font-bold">bash</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="p-1 hover:text-orange text-slate-400 transition-colors cursor-pointer font-bold font-mono text-xs"
            aria-label="Close Terminal"
          >
            [x]
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-slate-400">
          &gt; jld-sys telemetry console initialized. Type &apos;<span className="text-blue-600 dark:text-blue-400 font-semibold">help</span>&apos; for available commands.
        </p>

        {history.map((entry) => (
          <div key={entry.id} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-orange font-bold">guest@jld-sys:~$</span>
              <span className="text-white">{entry.command}</span>
            </div>
            <div className="text-slate-300 pl-2">{entry.output}</div>
          </div>
        ))}

        {isExecuting ? (
          <div className="flex items-center gap-2 pt-1 pl-2">
            <span className="inline-block w-2 h-3.5 bg-orange animate-pulse" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-orange font-bold">guest@jld-sys:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDownInput}
              className="flex-1 bg-transparent text-white outline-none border-none caret-orange font-mono"
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
              disabled={isExecuting}
            />
          </div>
        )}
      </div>
    </div>
  );
}
