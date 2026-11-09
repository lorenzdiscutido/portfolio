"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ResumeDownload from "@/components/ResumeDownload";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#experience", label: "Experience" },
    { href: "/#contact", label: "Contact" },
  ];

  const handleOpenTerminal = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-terminal"));
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0f1115]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <nav
        aria-label="Main Navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
      >
        {/* Brand */}
        <Link
          href="/"
          className="text-slate-900 dark:text-white font-extrabold text-xl tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 flex items-center gap-2 group"
          aria-label="Lorenz Homepage"
        >
          <span className="text-orange font-mono font-bold text-2xl transition-transform group-hover:translate-x-0.5">&gt;</span>
          <span className="font-extrabold tracking-tight">Lorenz</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 ml-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYS:ACTIVE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}

          {/* Interactive Terminal Quick Trigger */}
          <button
            type="button"
            onClick={handleOpenTerminal}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Open Interactive Terminal (Ctrl + `)"
            aria-label="Open Interactive Terminal"
          >
            <span className="text-orange font-bold font-mono group-hover:translate-x-0.5 transition-transform">&gt;_</span>
            <span>Terminal</span>
            <kbd className="hidden lg:inline-block text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5">Ctrl+`</kbd>
          </button>

          <ResumeDownload
            className="px-4 py-2 rounded-lg bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange text-slate-900 dark:text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />

          <ThemeToggle />
        </div>

        {/* Mobile Viewport Header Controls (All >= 44x44px touch targets) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Terminal Trigger Button */}
          <button
            type="button"
            onClick={handleOpenTerminal}
            aria-label="Open Interactive Terminal"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 text-orange font-mono font-bold text-sm hover:border-orange dark:hover:border-orange transition-colors cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            &gt;_
          </button>

          <ThemeToggle />

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200 text-base font-medium hover:border-orange dark:hover:border-orange transition-colors cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-t border-black/10 dark:border-white/10 bg-white/98 dark:bg-[#0f1115]/98 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2 shadow-2xl transition-all"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 min-h-[44px] flex items-center px-3.5 py-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-transparent hover:border-black/5 dark:hover:border-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Integrated Mobile Terminal Action */}
          <button
            type="button"
            onClick={handleOpenTerminal}
            className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold hover:border-orange dark:hover:border-orange transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-orange font-bold font-mono text-sm">&gt;_</span>
              <span>Launch Interactive Terminal</span>
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              READY
            </span>
          </button>

          <div className="pt-2">
            <ResumeDownload
              className="w-full min-h-[44px] text-center text-sm font-bold py-2.5 px-4 rounded-xl bg-orange !text-black border-2 border-black shadow-[3px_3px_0px_0px_#000000] active:shadow-none hover:opacity-95 transition-all flex items-center justify-center cursor-pointer"
            />
          </div>
        </div>
      )}
    </header>
  );
}
