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
  const [showMobileInput, setShowMobileInput] = useState<boolean>(false);

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
        <p key={idx} className={item.isStats ? "pt-2 text-[#94a3b8]" : "text-[#f8fafc]"}>
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

  const triggerResumeDownload = async () => {
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { default: ResumePDF } = await import("@/components/ResumePDF");
      const blob = await pdf(<ResumePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Jose_Lorenzo_Discutido_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF from terminal", err);
    }
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
      case "resume":
      case "cv":
        output = (
          <div className="space-y-0.5 font-mono py-0.5 text-xs">
            <p className="text-[#0052FF] font-bold">&gt; Compiling Jose_Lorenzo_Discutido_Resume.pdf...</p>
            <p className="text-[#94a3b8]">&gt; Download dispatched to browser.</p>
          </div>
        );
        triggerResumeDownload();
        break;
      case "projects":
        output = (
          <p className="font-mono text-xs text-[#0052FF]">&gt; Navigating to /#projects...</p>
        );
        scheduleNavigation("/#projects");
        break;
      case "contact":
        output = (
          <p className="font-mono text-xs text-[#0052FF]">&gt; Navigating to /#contact...</p>
        );
        scheduleNavigation("/#contact");
        break;
      case "help":
        output = (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-[#0052FF] font-bold">&gt; Available commands:</p>
            <p>
              &gt; <span className="text-[#0052FF]">whoami</span> — Display operator identity &amp; title
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">skills</span> — Categorized technical capabilities
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">experience</span> — Current &amp; previous engineering roles
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">education</span> — Academic degree &amp; institution
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">neofetch</span> — Display workstation telemetry
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">tailscale</span> — Inspect active Tailnet mesh nodes
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">ping &lt;ip&gt;</span> — Test ICMP echo reachability
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">cd &lt;dir&gt;</span> — Navigate to projects (komunikonek, iskiosk, vonotec, ~)
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">ls</span> — List navigable project directories
            </p>
            <p>
              &gt; <span className="text-[#0052FF]">clear</span> — Clear terminal output
            </p>
          </div>
        );
        break;
      case "whoami":
        output = (
          <div className="space-y-0.5 font-mono py-0.5">
            <p className="text-[#0052FF] font-bold">&gt; Engr. Jose Lorenzo Miguel Discutido</p>
            <p className="text-[#94a3b8]">
              &gt; Data and Systems Engineer
            </p>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="space-y-1 font-mono py-1 text-xs">
            <p>
              <span className="text-[#0052FF] font-bold">&gt; Core &amp; Web:</span>{" "}
              <span className="text-[#f8fafc]">
                Python, Next.js, TypeScript, Tailwind CSS
              </span>
            </p>
            <p>
              <span className="text-[#0052FF] font-bold">&gt; Hardware &amp; Mobile:</span>{" "}
              <span className="text-[#f8fafc]">
                C/C++, Dart, Flutter
              </span>
            </p>
            <p>
              <span className="text-[#0052FF] font-bold">&gt; Cloud &amp; Enterprise:</span>{" "}
              <span className="text-[#f8fafc]">
                Microsoft Entra ID, Microsoft Intune, SharePoint, Odoo ERP, Firebase
              </span>
            </p>
            <p>
              <span className="text-[#0052FF] font-bold">&gt; Database &amp; Network:</span>{" "}
              <span className="text-[#f8fafc]">
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
              <span className="text-[#0052FF] font-bold">&gt; Current:</span>{" "}
              <span className="text-[#f8fafc]">
                Digital Data &amp; Systems Engineer and AI/IoT Data Officer @ Vonotec
              </span>
            </p>
            <p>
              <span className="text-[#94a3b8] font-bold">&gt; Previous:</span>{" "}
              <span className="text-[#f8fafc]">
                IT Systems &amp; Network Intern @ PHINMA Properties
              </span>
            </p>
          </div>
        );
        break;
      case "education":
        output = (
          <div className="space-y-0.5 font-mono py-1 text-xs">
            <p className="text-[#f8fafc] font-bold">
              &gt; Bachelor of Science in Computer Engineering
            </p>
            <p className="text-[#0052FF] font-semibold">
              &gt; Polytechnic University of the Philippines (PUP)
            </p>
          </div>
        );
        break;
      case "neofetch":
      case "fastfetch":
        output = (
          <div className="space-y-0.5 py-1 text-xs">
            <p className="text-[#0052FF] font-bold">guest@jld-stealth-rig</p>
            <p className="text-white/20">-------------------------</p>
            <p>
              <span className="text-[#0052FF]">OS:</span> Linux / Windows 11 Pro (WSL2)
            </p>
            <p>
              <span className="text-[#0052FF]">Chassis:</span> Stealth All-Black / Zero-RGB Build
            </p>
            <p>
              <span className="text-[#0052FF]">Acoustics:</span> &lt; 22 dBA Silent Fan Curve
            </p>
            <p>
              <span className="text-[#0052FF]">Role:</span> Digital Data &amp; Systems Engineer @ Vonotec
            </p>
            <p>
              <span className="text-[#0052FF]">Education:</span> BS Computer Engineering (PUP)
            </p>
            <p>
              <span className="text-[#0052FF]">Tailnet:</span> 4 Nodes Online (WireGuard Mesh OK)
            </p>
          </div>
        );
        break;
      case "tailscale":
      case "tailscale status":
        output = (
          <div className="space-y-1 py-1 text-xs font-mono">
            <p className="text-[#0052FF] font-bold">IPv4         HOSTNAME               ROLE                  STATUS</p>
            <p>
              <span className="text-[#0052FF]">100.64.0.1</span>   vonotec-cluster-alpha  MySQL Master A (Odd)  online, direct
            </p>
            <p>
              <span className="text-[#0052FF]">100.64.0.2</span>   iskiosk-mcu-gateway    MCU Hardware Interlock online, direct
            </p>
            <p>
              <span className="text-[#0052FF]">100.64.0.3</span>   entra-id-governance    Identity Proxy (MSAL) online, direct
            </p>
            <p>
              <span className="text-[#0052FF]">100.64.0.4</span>   jld-stealth-rig        Workstation (Linux)   active, local
            </p>
          </div>
        );
        break;
      case "ping": {
        if (!arg) {
          output = (
            <p className="font-mono text-xs text-[#FF7A00]">Usage: ping &lt;ip_address&gt;</p>
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
            <p className="font-mono text-xs text-[#0052FF]">&gt; Navigating to /home...</p>
          );
          scheduleNavigation("/");
          break;
        }

        if (target === "..") {
          output = (
            <p className="font-mono text-xs text-[#0052FF]">&gt; Navigating back...</p>
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
            <p className="font-mono text-xs text-[#0052FF]">&gt; Navigating to /projects/komunikonek...</p>
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
            <p className="font-mono text-xs text-[#0052FF]">&gt; Navigating to /projects/iskiosk-terminal...</p>
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
            <p className="font-mono text-xs text-[#0052FF]">&gt; Navigating to /projects/vonotec-defect-logger...</p>
          );
          scheduleNavigation("/projects/vonotec-defect-logger");
          break;
        }

        output = (
          <p className="font-mono text-xs text-[#FF7A00]">cd: {arg}: No such file or directory</p>
        );
        break;
      }
      case "ls":
      case "dir":
        output = (
          <div className="space-y-1 font-mono text-xs py-0.5">
            <p className="text-[#0052FF] font-bold">drwxr-xr-x  projects/</p>
            <div className="pl-4 space-y-0.5 text-[#f8fafc]">
              <p>&gt; <span className="text-[#0052FF] font-semibold">vonotec/</span> — Vonotec Automated Defect Logger</p>
              <p>&gt; <span className="text-[#0052FF] font-semibold">iskiosk/</span> — IsKiosk: Document Management System</p>
              <p>&gt; <span className="text-[#0052FF] font-semibold">komunikonek/</span> — Komunikonek Mobile Dashboard</p>
            </div>
            <p className="text-[#94a3b8] pt-1 text-[11px]">&gt; Tip: Use &apos;<span className="text-[#0052FF]">cd &lt;dir&gt;</span>&apos; to navigate.</p>
          </div>
        );
        break;
      case "zzz":
      case "synergy":
        output = (
          <div className="space-y-1 py-1 text-xs">
            <p className="text-[#0052FF] font-bold">Zenless Zone Zero // Combat Analytics Log</p>
            <p>
              • <span className="text-[#0052FF]">Anomaly Buildup &amp; Disorder</span> ↔ Event stream buffer thresholds &amp; state flushes
            </p>
            <p>
              • <span className="text-[#0052FF]">Stun Daze Window</span> ↔ Burst throughput window during low-contention locks
            </p>
            <p>
              • <span className="text-[#0052FF]">Quick Assist Rotations</span> ↔ Zero-downtime node handoffs in distributed pipelines
            </p>
          </div>
        );
        break;
      case "sudo":
        output = (
          <span className="text-xs">
            <span className="text-[#FF7A00]">Permission denied.</span> This incident will be reported.
          </span>
        );
        break;
      default:
        if (djb2(primaryCmd) === "66b43384") {
          output = (
            <p className="font-mono text-xs text-[#0052FF]">&gt; Navigating to /projects/komunikonek...</p>
          );
          scheduleNavigation("/projects/komunikonek");
          break;
        }
        output = (
          <span className="text-xs">
            Command not found. Type &apos;<span className="text-[#0052FF]">help</span>&apos; for available commands.
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
        className="fixed bottom-16 right-4 z-40 min-h-11 px-4 py-2 rounded-full bg-[#1e2128]/80 backdrop-blur-md border border-white/5 text-[#f8fafc] text-xs font-mono hover:border-[#0052FF]/50 shadow-none transition-all cursor-pointer flex items-center gap-2.5 group"
        aria-label="Open Interactive Terminal"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]"></span>
        </span>
        <span className="font-bold">&gt;_ Terminal</span>
        <span className="hidden sm:inline text-[10px] text-[#94a3b8] bg-[#0f1115] px-1.5 py-0.5 rounded border border-white/10">
          Ctrl+`
        </span>
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={() => !isExecuting && inputRef.current?.focus()}
      className="dark fixed bottom-4 inset-x-4 md:inset-x-auto md:bottom-10 md:right-10 w-auto md:w-full md:max-w-lg max-h-[85vh] bg-[#0f1115] text-[#f8fafc] border border-white/10 rounded-2xl shadow-none flex flex-col font-mono text-sm p-0 z-50 cursor-text transition-all overflow-hidden"
    >
      {/* Authentic Terminal Top Bar with 3 OS Dots */}
      <div className="bg-[#1e2128] px-4 py-3 border-b border-white/5 flex justify-between items-center text-xs select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="w-3 h-3 rounded-full bg-[#ef4444] hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Close Terminal"
            />
            <span className="w-3 h-3 rounded-full bg-[#eab308]" />
            <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
          </div>
          <span className="text-[#94a3b8] text-xs font-mono ml-2">
            guest@jld-stealth-rig: ~
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#94a3b8]">bash</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="text-[#94a3b8] hover:text-[#f8fafc] text-xs font-mono px-1 transition-colors cursor-pointer"
            aria-label="Close Terminal"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 overflow-hidden">
        <div className="space-y-3 overflow-y-auto max-h-56 pr-1">
          <p className="text-xs text-[#94a3b8]">
            &gt; jld-sys telemetry console initialized. Type &apos;<span className="text-[#0052FF] font-semibold">help</span>&apos; for available commands.
          </p>

          {history.map((entry) => (
            <div key={entry.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[#0052FF] font-bold">guest@jld-sys:~$</span>
                <span className="text-[#f8fafc]">{entry.command}</span>
              </div>
              <div className="text-[#94a3b8] pl-2">{entry.output}</div>
            </div>
          ))}
        </div>

        {/* Quick Commands Touch Grid */}
        <div className="pt-3 border-t border-white/5 mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#94a3b8]">
              Quick Commands
            </span>
            <button
              type="button"
              onClick={() => setShowMobileInput((prev) => !prev)}
              className="md:hidden text-[11px] font-mono text-[#94a3b8] hover:text-[#f8fafc] min-h-[36px] flex items-center px-1"
            >
              {showMobileInput ? "Hide CLI" : "Type CLI"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleCommand("projects")}
              className="min-h-[40px] px-3 py-2 rounded-lg bg-[#1e2128] hover:bg-[#1e2128]/90 border border-white/5 hover:border-[#0052FF]/50 text-[#f8fafc] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052FF]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#0052FF]">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <span>View Projects</span>
            </button>
            <button
              type="button"
              onClick={() => handleCommand("resume")}
              className="min-h-[40px] px-3 py-2 rounded-lg bg-[#1e2128] hover:bg-[#1e2128]/90 border border-white/5 hover:border-[#0052FF]/50 text-[#f8fafc] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052FF]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#0052FF]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Read Resume</span>
            </button>
            <button
              type="button"
              onClick={() => handleCommand("contact")}
              className="min-h-[40px] px-3 py-2 rounded-lg bg-[#1e2128] hover:bg-[#1e2128]/90 border border-white/5 hover:border-[#0052FF]/50 text-[#f8fafc] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052FF]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#0052FF]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        {/* CLI Command Line Input */}
        <div className={`${showMobileInput ? "flex" : "hidden md:flex"} items-center gap-2 pt-3`}>
          {isExecuting ? (
            <div className="flex items-center gap-2 pl-2">
              <span className="inline-block w-2 h-3.5 bg-[#FF7A00] animate-pulse" />
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <span className="text-[#0052FF] font-bold">guest@jld-sys:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDownInput}
                className="flex-1 bg-transparent text-[#f8fafc] outline-none border-none caret-[#FF7A00] font-mono"
                aria-label="Terminal command input"
                autoComplete="off"
                spellCheck={false}
                disabled={isExecuting}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
