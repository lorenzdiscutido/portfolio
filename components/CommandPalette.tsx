"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

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
        setIsOpen((prev) => !prev);
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
      } else if (e.key === "Enter" && filteredCommands[activeIndex]) {
        e.preventDefault();
        const selected = filteredCommands[activeIndex];
        setIsOpen(false);
        selected.action();
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen, filteredCommands, activeIndex]);

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
            transition={{ duration: 0.18 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-midnight/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Command Palette Modal Container (backdrop-blur-3xl, bg-slate-900/40, zero hard shadow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-xl rounded-2xl bg-slate-900/40 backdrop-blur-3xl border border-white/15 shadow-none overflow-hidden"
          >
            {/* Search Header with Solid Disruptive Block Cursor */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <span className="font-mono text-sm font-bold text-neonPink dark:text-chartreuse select-none">
                &gt;_
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search system nodes..."
                  aria-label="Command Palette Search Input"
                  data-testid="command-palette-input"
                  className="w-full bg-transparent text-frost placeholder:text-slate-400 font-mono text-sm outline-none border-none caret-neonPink"
                />
                {/* Solid Disruptive Accent Block Caret Indicator */}
                <span
                  aria-hidden="true"
                  className="inline-block w-2.5 h-4 bg-neonPink dark:bg-chartreuse animate-pulse ml-2 shrink-0"
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-chartreuse bg-chartreuse/10 border border-chartreuse/30 px-2 py-0.5 rounded-full">
                Bullet-Time: ON
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Command Palette"
                className="text-xs font-mono text-slate-400 hover:text-frost px-2 py-1 rounded border border-white/10"
              >
                ESC
              </button>
            </div>

            {/* Command List */}
            <div
              role="listbox"
              aria-label="Available Commands"
              className="max-h-72 overflow-y-auto py-2 divide-y divide-white/5"
            >
              {filteredCommands.length === 0 ? (
                <p className="px-4 py-6 text-center font-mono text-xs text-slate-400">
                  No matching system routes found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                filteredCommands.map((item, idx) => {
                  const isActive = idx === activeIndex;
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
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? "border-l-4 border-[#FF007F] bg-gradient-to-r from-[#FF007F]/25 via-[#CCFF00]/10 to-transparent text-frost"
                          : "border-l-4 border-transparent text-slate-300 hover:text-frost"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-frost">
                          {item.label}
                        </span>
                        <span className="text-[11px] font-mono text-slate-300">
                          {item.category}
                        </span>
                      </div>
                      {item.shortcut && (
                        <kbd className="font-mono text-[11px] text-slate-300 bg-white/10 px-2 py-0.5 rounded border border-white/10">
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
