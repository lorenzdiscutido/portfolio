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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
          <div className="space-y-1">
            <p>Available commands:</p>
            <p>
              <span className="text-blue">help</span> — Show available commands
            </p>
            <p>
              <span className="text-blue">whoami</span> — Display operator identity
            </p>
            <p>
              <span className="text-blue">skills</span> — List core technical capabilities
            </p>
            <p>
              <span className="text-blue">sudo</span> — Execute with superuser privileges
            </p>
            <p>
              <span className="text-blue">clear</span> — Clear terminal output
            </p>
          </div>
        );
        break;
      case "whoami":
        output = (
          <span>
            <span className="text-blue">Jose Lorenzo Discutido</span> - Digital Data &amp; Systems Engineer
          </span>
        );
        break;
      case "skills":
        output = (
          <span>
            <span className="text-blue">Python</span>,{" "}
            <span className="text-blue">Next.js</span>,{" "}
            <span className="text-blue">Entra ID</span>,{" "}
            <span className="text-blue">Microcontrollers</span>,{" "}
            <span className="text-blue">Tailscale</span>
          </span>
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

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="fixed bottom-4 right-4 md:bottom-10 md:right-10 w-full max-w-lg h-80 bg-surface border border-[#2d313a] rounded-lg shadow-2xl overflow-y-auto font-mono text-sm p-4 z-50 cursor-text"
    >
      <div className="mb-3 pb-2 border-b border-[#2d313a] flex justify-between items-center text-muted text-xs">
        <span>jld-sys terminal (Ctrl + ` to toggle)</span>
        <span className="text-blue">bash</span>
      </div>

      <div className="space-y-3">
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-orange">guest@jld-sys:~$</span>
              <span className="text-primary">{entry.command}</span>
            </div>
            <div className="text-muted pl-2">{entry.output}</div>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="text-orange">guest@jld-sys:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDownInput}
            className="flex-1 bg-transparent text-primary outline-none border-none caret-orange"
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
