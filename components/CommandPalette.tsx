"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<{ command: string; output: string }[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isTerminalMode = query.startsWith(">");

  const executeTerminalCommand = useCallback((raw: string) => {
    const trimmed = raw.replace(/^>/, "").trim();
    if (!trimmed) return;
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let output = "";
    if (cmd === "help") {
      output = "Available commands: ping <ip>, ssh <host>, tailscale, neofetch, whoami, skills, experience, education, projects, resume, contact, clear, exit";
    } else if (cmd === "whoami") {
      output = "Engr. Jose Lorenzo Miguel Discutido — Digital Data & Systems Engineer @ Vonotec (Batangas, PH / Tailscale: 100.64.0.1)";
    } else if (cmd === "skills" || cmd === "stack") {
      output = "Core: Python, TypeScript, Next.js, Flutter | Cyber-Physical: C/C++, Arduino Uno, Relays, Solenoids | Infra: MySQL GTID, WireGuard, Tailscale, Linux, MS Entra ID";
    } else if (cmd === "experience") {
      output = "Current: Digital Data & Systems Engineer @ Vonotec | Previous: Systems & Network Intern @ PHINMA Properties | Education: PUP Manila";
    } else if (cmd === "education") {
      output = "Bachelor of Science in Computer Engineering — Polytechnic University of the Philippines (PUP) Manila";
    } else if (cmd === "tailscale" || cmd === "mesh" || cmd === "status") {
      output = "Tailnet 4/4 Nodes Meshed: 100.64.0.1 (vonotec-alpha: Master A), 100.64.0.2 (iskiosk-gateway: Master B), 100.64.0.3 (cloud-gateway: Ingress), 100.64.0.4 (jld-stealth-rig: Linux)";
    } else if (cmd === "neofetch" || cmd === "fastfetch") {
      output = "OS: Linux 6.6 / Windows 11 (WSL2) | Chassis: Zero-RGB Stealth Build (<22 dBA) | Tailnet: 4 Nodes Meshed (Direct WireGuard) | GTID Lag: 0ms";
    } else if (cmd === "ping") {
      const target = arg || "100.64.0.1";
      if (target === "100.64.0.1") {
        output = `PING 100.64.0.1: 64 bytes from vonotec-cluster-alpha: icmp_seq=1 ttl=64 time=12.4 ms [Direct WireGuard Link OK]`;
      } else if (target === "100.64.0.2") {
        output = `PING 100.64.0.2: 64 bytes from iskiosk-mcu-gateway: icmp_seq=1 ttl=64 time=14.2 ms [Hardware Interlock Armed]`;
      } else if (target === "100.64.0.3") {
        output = `PING 100.64.0.3: 64 bytes from cloud-gateway: icmp_seq=1 ttl=64 time=18.6 ms [Tailscale Subnet Proxy OK]`;
      } else if (target === "100.64.0.4") {
        output = `PING 100.64.0.4: 64 bytes from jld-stealth-rig: icmp_seq=1 ttl=64 time=0.4 ms (Localhost Loopback)`;
      } else {
        output = `PING ${target}: 64 bytes from ${target}: icmp_seq=1 ttl=64 time=19.8 ms [Mesh Packet Acknowledged]`;
      }
    } else if (cmd === "ssh") {
      const host = arg || "100.64.0.1";
      output = `Authenticated via Tailnet WireGuard keypair [ed25519-sha256]. Connected to ${host} (Ubuntu 24.04 LTS x86_64). Cluster interlocks armed.`;
    } else if (cmd === "projects" || cmd === "cd projects") {
      output = "Navigating to spotlight bento projects...";
      router.push("/#projects");
      setIsOpen(false);
    } else if (cmd === "contact" || cmd === "mail") {
      output = "Navigating to secure transmission contact form...";
      router.push("/#contact");
      setIsOpen(false);
    } else if (cmd === "resume" || cmd === "cv" || cmd === "cat resume.pdf") {
      output = "Opening official engineering curriculum vitae...";
      window.open("/resume.pdf", "_blank");
    } else if (cmd === "clear") {
      setTerminalLogs([]);
      setQuery("> ");
      return;
    } else if (cmd === "exit") {
      setIsOpen(false);
      return;
    } else {
      output = `Command not recognized: '${trimmed}'. Type 'help' for available CLI commands.`;
    }

    setTerminalLogs((prev) => [...prev, { command: trimmed, output }]);
    setQuery("> ");
  }, [router]);

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "nav-projects",
        label: "Explore Spotlight Bento Projects",
        category: "Navigation",
        shortcut: "G P",
        action: () => {
          router.push("/#projects");
        },
      },
      {
        id: "case-vonotec",
        label: "Case Study: Vonotec Active-Active MySQL Mesh",
        category: "Case Studies",
        shortcut: "01",
        action: () => {
          router.push("/projects/vonotec-defect-logger");
        },
      },
      {
        id: "case-komunikonek",
        label: "Case Study: Komunikonek Barangay Digital Hub",
        category: "Case Studies",
        shortcut: "02",
        action: () => {
          router.push("/projects/komunikonek");
        },
      },
      {
        id: "case-iskiosk",
        label: "Case Study: IsKiosk Microcontroller Terminal (QA)",
        category: "Case Studies",
        shortcut: "03",
        action: () => {
          router.push("/projects/iskiosk-terminal");
        },
      },
      {
        id: "sys-terminal",
        label: "Launch Interactive Telemetry Shell (>_) ",
        category: "System Console",
        shortcut: "Ctrl+`",
        action: () => {
          window.dispatchEvent(new CustomEvent("open-terminal"));
        },
      },
      {
        id: "nav-experience",
        label: "Inspect Engineering Experience & QA Metrics",
        category: "Navigation",
        shortcut: "G E",
        action: () => {
          router.push("/#experience");
        },
      },
      {
        id: "nav-contact",
        label: "Initiate Direct Transmission (Contact)",
        category: "Navigation",
        shortcut: "G C",
        action: () => {
          router.push("/#contact");
        },
      },
    ],
    [router]
  );

  const terminalHelperCommands: CommandItem[] = useMemo(
    () => [
      {
        id: "term-ping",
        label: "> ping 100.64.0.1 — Test Tailscale WireGuard mesh packet latency",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("ping 100.64.0.1"),
      },
      {
        id: "term-ssh",
        label: "> ssh 100.64.0.1 — Connect to cluster over encrypted Tailscale overlay",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("ssh 100.64.0.1"),
      },
      {
        id: "term-tailscale",
        label: "> tailscale — Inspect active 4-node WireGuard VPN mesh topology",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("tailscale"),
      },
      {
        id: "term-neofetch",
        label: "> neofetch — Print stealth workstation specs & kernel telemetry",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("neofetch"),
      },
      {
        id: "term-whoami",
        label: "> whoami — Print engineer identity & network credentials",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("whoami"),
      },
      {
        id: "term-skills",
        label: "> skills — Enumerate cyber-physical and systems engineering stack",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("skills"),
      },
      {
        id: "term-help",
        label: "> help — Display available terminal shell commands",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("help"),
      },
      {
        id: "term-projects",
        label: "> projects — Navigate to spotlight bento projects",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("projects"),
      },
      {
        id: "term-resume",
        label: "> resume — Inspect official curriculum vitae",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("resume"),
      },
      {
        id: "term-contact",
        label: "> contact — Initiate direct client transmission",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("contact"),
      },
      {
        id: "term-clear",
        label: "> clear — Clear command palette terminal log",
        category: "Terminal CLI",
        shortcut: "ENTER",
        action: () => executeTerminalCommand("clear"),
      },
    ],
    [executeTerminalCommand]
  );

  const filteredCommands = useMemo(() => {
    if (isTerminalMode) {
      const q = query.slice(1).trim().toLowerCase();
      if (!q) return terminalHelperCommands;
      return terminalHelperCommands.filter((cmd) =>
        cmd.label.toLowerCase().includes(q)
      );
    }
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [commands, query, isTerminalMode, terminalHelperCommands]);

  // Clamp activeIndex to valid bounds without triggering cascading renders in an effect
  const safeActiveIndex =
    filteredCommands.length > 0 && activeIndex >= filteredCommands.length
      ? 0
      : activeIndex;

  // Dispatch Bullet-Time signal to LiquidBackground Canvas when modal opens/closes
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("liquid-bullet-time", {
        detail: { active: isOpen, timeScale: isOpen ? 0.15 : 1 },
      })
    );
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) setActiveIndex(0);
          return !prev;
        });
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredCommands.length > 0 ? (prev + 1) % filteredCommands.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredCommands.length > 0
            ? (prev - 1 + filteredCommands.length) % filteredCommands.length
            : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (isTerminalMode) {
          const rawCmd = query.slice(1).trim();
          if (rawCmd) {
            executeTerminalCommand(rawCmd);
            return;
          }
        }
        if (filteredCommands[safeActiveIndex]) {
          const selected = filteredCommands[safeActiveIndex];
          if (!isTerminalMode) {
            setIsOpen(false);
          }
          selected.action();
        }
      }
    };

    const handleCustomOpen = () => {
      setActiveIndex(0);
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen, filteredCommands, safeActiveIndex, isTerminalMode, query, executeTerminalCommand]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          data-testid="command-palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4"
        >
          {/* Frosted Backdrop with Zero Hard Shadows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-base/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Command Palette Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative z-10 w-full max-w-xl rounded-2xl bg-[#1e2128]/70 dark:bg-[#1e2128]/70 bg-white/85 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden"
          >
            {/* Search Header with Electric Blue prompt and Specular Cyan block cursor */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b-[0.5px] border-white/10 dark:border-white/10 border-black/5">
              <span aria-hidden="true" className="font-mono text-sm font-bold text-[#0052FF] dark:text-[#38bdf8] select-none">
                &gt;_
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  autoFocus
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-autocomplete="list"
                  aria-controls="command-palette-listbox"
                  aria-activedescendant={filteredCommands[safeActiveIndex] ? `cmd-item-${filteredCommands[safeActiveIndex].id}` : undefined}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder={
                    isTerminalMode
                      ? "Terminal CLI: type 'ping 100.64.0.1', 'ssh', 'tailscale', 'help'..."
                      : "Type a command or search system nodes (type '>' for Terminal CLI)..."
                  }
                  aria-label="Command Palette Search Input"
                  data-testid="command-palette-input"
                  className="w-full bg-transparent text-primary placeholder:text-muted font-mono text-xs sm:text-sm outline-none border-none caret-[#0052FF] dark:caret-[#38bdf8]"
                />
                {/* Hairline Electric Blue Accent Block Caret Indicator */}
                <span
                  aria-hidden="true"
                  className="inline-block w-2 h-4 bg-[#0052FF] dark:bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.5)] animate-pulse ml-2 shrink-0"
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0052FF] dark:text-[#38bdf8] bg-[#0052FF]/10 border-[0.5px] border-[#0052FF]/30 px-2 py-0.5 rounded-full">
                {isTerminalMode ? "CLI ACTIVE" : "SYSTEM NAV"}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Command Palette"
                className="text-[11px] font-mono text-muted hover:text-primary px-2 py-1 rounded border-[0.5px] border-white/10 dark:border-white/10 border-black/5 hover:border-electricBlue/50 transition-colors duration-200"
              >
                ESC
              </button>
            </div>

            {/* Terminal Mode Logs View */}
            {isTerminalMode && terminalLogs.length > 0 && (
              <div className="px-4 py-3 bg-black/40 dark:bg-black/60 border-b-[0.5px] border-white/10 space-y-2 max-h-48 overflow-y-auto font-mono text-xs">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center gap-2 text-[#0052FF] dark:text-[#38bdf8] font-bold">
                      <span aria-hidden="true">&gt;_</span>
                      <span className="text-[#f8fafc]">{log.command}</span>
                    </div>
                    <p className="text-slate-300 dark:text-slate-300 pl-4">{log.output}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Command List */}
            <div
              id="command-palette-listbox"
              role="listbox"
              aria-label="Available Commands"
              className="max-h-72 overflow-y-auto py-2 divide-y-[0.5px] divide-white/10 dark:divide-white/10 divide-black/5"
            >
              {filteredCommands.length === 0 ? (
                <p className="px-4 py-6 text-center font-mono text-xs text-muted">
                  No matching system routes found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                filteredCommands.map((item, idx) => {
                  const isActive = idx === safeActiveIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      data-testid={`cmd-item-${item.id}`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        setIsOpen(false);
                        item.action();
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? "border-l-2 border-[#0052FF] dark:border-[#38bdf8] bg-[#0052FF]/15 text-primary"
                          : "border-l-2 border-transparent text-muted hover:text-primary hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium font-sans text-primary dark:text-frost">
                          {item.label}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-muted">
                          {item.category}
                        </span>
                      </div>
                      {item.shortcut && (
                        <kbd className="font-mono text-[11px] text-muted bg-black/[0.04] dark:bg-base/60 px-2 py-0.5 rounded border-[0.5px] border-white/10 dark:border-white/10 border-black/5">
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
