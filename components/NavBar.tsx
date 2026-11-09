"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import ResumeDownload from "@/components/ResumeDownload";
import MagneticButton from "@/components/MagneticButton";

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

  const handleOpenCommandPalette = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header className="sticky top-3 z-50 w-full px-3 sm:px-6 transition-all duration-200">
      <nav
        aria-label="Main Navigation"
        className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 rounded-full bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none flex items-center justify-between"
      >
        {/* Brand */}
        <MagneticButton strength={0.2}>
          <Link
            href="/"
            className="text-[#f8fafc] font-sans font-extrabold text-base sm:text-lg lg:text-xl tracking-tight hover:text-[#0052FF] transition-colors duration-200 py-1 flex items-center gap-2 group shrink-0"
            aria-label="Lorenz Homepage"
          >
            <span className="text-[#0052FF] font-mono font-bold text-lg sm:text-xl transition-transform duration-200 group-hover:translate-x-0.5">
              &gt;
            </span>
            <span className="font-extrabold tracking-tight font-sans">Lorenz</span>
            <span className="hidden xl:inline-flex items-center gap-1.5 ml-1 px-2.5 py-0.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/25 text-xs font-mono text-[#FF7A00] font-semibold tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
              SYS:ACTIVE
            </span>
          </Link>
        </MagneticButton>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2 xl:gap-2.5 shrink-0">
          {navLinks.map((link) => (
            <MagneticButton key={link.href} strength={0.25}>
              <Link
                href={link.href}
                className="text-xs lg:text-sm font-sans font-medium text-slate-400 hover:text-[#0052FF] transition-colors duration-200 px-1.5 lg:px-2 py-1 rounded-full whitespace-nowrap"
              >
                {link.label}
              </Link>
            </MagneticButton>
          ))}

          {/* Matte Frosted Command Palette (Ctrl+K) Trigger */}
          <MagneticButton strength={0.22}>
            <button
              type="button"
              onClick={handleOpenCommandPalette}
              data-testid="navbar-cmdk-button"
              className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-full bg-[#0f1115]/60 border border-white/5 hover:border-[#0052FF]/50 text-[#f8fafc] text-xs font-mono font-semibold transition-colors duration-200 cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] shrink-0"
              title="Open Command Palette (Ctrl + K)"
              aria-label="Open Command Palette"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-slate-400">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="hidden xl:inline">Search</span>
              <kbd className="text-[10px] lg:text-xs font-mono text-[#0052FF] bg-[#0f1115] px-1.5 py-0.5 rounded border border-white/5">
                Ctrl+K
              </kbd>
            </button>
          </MagneticButton>

          {/* Interactive Terminal Quick Trigger */}
          <MagneticButton strength={0.22}>
            <button
              type="button"
              onClick={handleOpenTerminal}
              className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-full bg-[#0f1115]/60 border border-white/5 hover:border-[#0052FF]/50 text-[#f8fafc] text-xs font-mono font-semibold transition-colors duration-200 cursor-pointer shadow-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] shrink-0"
              title="Open Interactive Terminal (Ctrl + `)"
              aria-label="Open Interactive Terminal"
            >
              <span className="text-[#0052FF] font-bold font-mono group-hover:translate-x-0.5 transition-transform duration-200">
                &gt;_
              </span>
              <span className="hidden xl:inline font-mono">Terminal</span>
              <kbd className="text-[10px] lg:text-xs font-mono text-[#0052FF] bg-[#0f1115] px-1.5 py-0.5 rounded border border-white/5">
                Ctrl+`
              </kbd>
            </button>
          </MagneticButton>

          {/* Resume Download CTA */}
          <div className="hidden lg:block shrink-0">
            <MagneticButton strength={0.22}>
              <ResumeDownload className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#0052FF] hover:bg-[#0041cc] text-white text-xs font-mono font-semibold transition-colors duration-200 cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]" />
            </MagneticButton>
          </div>

          <MagneticButton strength={0.22}>
            <ThemeToggle />
          </MagneticButton>
        </div>

        {/* Mobile Viewport Header Controls */}
        <div className="flex md:hidden items-center gap-1.5">
          {/* Quick Terminal Trigger Button */}
          <button
            type="button"
            onClick={handleOpenTerminal}
            aria-label="Open Interactive Terminal"
            className="min-w-11 min-h-11 flex items-center justify-center rounded-full bg-[#0f1115]/60 border border-white/5 text-[#0052FF] font-mono font-bold text-sm hover:border-[#0052FF]/50 transition-colors duration-200 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
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
            data-testid="mobile-menu-button"
            className="min-w-11 min-h-11 flex items-center justify-center rounded-full bg-[#0f1115]/60 border border-white/5 text-[#f8fafc] text-base font-medium hover:border-[#0052FF]/50 transition-colors duration-200 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Slide-In Mobile Glassmorphism Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Frosted Backdrop Overlay */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#0f1115]/75 backdrop-blur-md md:hidden"
              aria-hidden="true"
            />

            {/* Side Slide-In Panel */}
            <motion.aside
              key="mobile-drawer"
              id="mobile-nav-drawer"
              data-testid="mobile-nav-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-xs bg-[#1e2128]/95 backdrop-blur-md border-l border-white/5 p-6 flex flex-col justify-between shadow-none md:hidden overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                    Navigation Console
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Dismiss drawer"
                    className="min-w-11 min-h-11 flex items-center justify-center rounded-full bg-[#0f1115] border border-white/5 text-[#f8fafc] hover:border-[#0052FF]/50 transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-sans font-semibold text-[#f8fafc] hover:text-[#0052FF] min-h-11 flex items-center px-4 py-2.5 rounded-xl bg-[#0f1115]/40 border border-transparent hover:border-white/5 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Integrated Command Palette & Terminal Actions */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleOpenCommandPalette}
                    className="w-full min-h-11 flex items-center justify-between px-4 py-3 rounded-xl bg-[#0f1115]/60 border border-white/5 text-[#f8fafc] font-mono text-xs font-semibold hover:border-[#0052FF]/50 transition-colors duration-200 cursor-pointer"
                  >
                    <span>Command Palette</span>
                    <kbd className="text-xs font-mono text-[#0052FF] bg-[#0f1115] px-2 py-0.5 rounded border border-white/5">
                      Ctrl+K
                    </kbd>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenTerminal}
                    className="w-full min-h-11 flex items-center justify-between px-4 py-3 rounded-xl bg-[#0f1115]/60 border border-white/5 text-[#f8fafc] font-mono text-xs font-semibold hover:border-[#0052FF]/50 transition-colors duration-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[#0052FF] font-bold font-mono text-sm">
                        &gt;_
                      </span>
                      <span>Launch Interactive Terminal</span>
                    </span>
                    <span className="text-xs text-[#0052FF] font-mono font-bold uppercase tracking-wider bg-[#0052FF]/10 px-2 py-0.5 rounded border border-[#0052FF]/20">
                      READY
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <ResumeDownload className="w-full min-h-11 text-center text-sm font-mono font-bold py-3 px-4 rounded-full bg-[#0052FF] text-white hover:bg-[#0041cc] shadow-none transition-colors duration-200 flex items-center justify-center cursor-pointer" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
