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
    <header className="sticky top-3 z-50 w-full px-3 sm:px-6 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 rounded-full bg-white/85 dark:bg-midnight/75 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl flex items-center justify-between"
      >
        {/* Brand */}
        <MagneticButton strength={0.2}>
          <Link
            href="/"
            className="text-slate-900 dark:text-frost font-extrabold text-lg sm:text-xl tracking-tight hover:text-neonPink dark:hover:text-chartreuse transition-colors py-1.5 flex items-center gap-2 group"
            aria-label="Lorenz Homepage"
          >
            <span className="text-neonPink dark:text-chartreuse font-mono font-bold text-xl sm:text-2xl transition-transform group-hover:translate-x-0.5">
              &gt;
            </span>
            <span className="font-extrabold tracking-tight">Lorenz</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYS:ACTIVE
            </span>
          </Link>
        </MagneticButton>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <MagneticButton key={link.href} strength={0.25}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-neonPink dark:hover:text-chartreuse transition-colors px-2 py-1 rounded-full"
              >
                {link.label}
              </Link>
            </MagneticButton>
          ))}

          {/* Frosted Command Palette (Ctrl+K) Trigger */}
          <MagneticButton strength={0.22}>
            <button
              type="button"
              onClick={handleOpenCommandPalette}
              data-testid="navbar-cmdk-button"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neonPink dark:hover:border-chartreuse text-slate-800 dark:text-frost text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse"
              title="Open Command Palette (Ctrl + K)"
              aria-label="Open Command Palette"
            >
              <span>Search</span>
              <kbd className="text-xs font-mono text-neonPink dark:text-chartreuse bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded-full border border-black/5 dark:border-white/5">
                Ctrl+K
              </kbd>
            </button>
          </MagneticButton>

          {/* Interactive Terminal Quick Trigger */}
          <MagneticButton strength={0.22}>
            <button
              type="button"
              onClick={handleOpenTerminal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neonPink dark:hover:border-chartreuse text-slate-800 dark:text-frost text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse"
              title="Open Interactive Terminal (Ctrl + `)"
              aria-label="Open Interactive Terminal"
            >
              <span className="text-neonPink dark:text-chartreuse font-bold font-mono group-hover:translate-x-0.5 transition-transform">
                &gt;_
              </span>
              <span>Terminal</span>
            </button>
          </MagneticButton>

          <MagneticButton strength={0.22}>
            <ResumeDownload className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neonPink dark:hover:border-chartreuse text-slate-900 dark:text-frost text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse" />
          </MagneticButton>

          <ThemeToggle />
        </div>

        {/* Mobile Viewport Header Controls (All >= 2.75rem touch targets) */}
        <div className="flex md:hidden items-center gap-1.5">
          {/* Quick Terminal Trigger Button */}
          <button
            type="button"
            onClick={handleOpenTerminal}
            aria-label="Open Interactive Terminal"
            className="min-w-11 min-h-11 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neonPink dark:text-chartreuse font-mono font-bold text-sm hover:border-neonPink dark:hover:border-chartreuse transition-colors cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse"
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
            className="min-w-11 min-h-11 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-frost text-base font-medium hover:border-neonPink dark:hover:border-chartreuse transition-colors cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse"
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
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-midnight/60 backdrop-blur-md md:hidden"
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
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-xs bg-white/95 dark:bg-midnight/90 backdrop-blur-2xl border-l border-black/10 dark:border-white/10 p-6 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Navigation Console
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Dismiss drawer"
                    className="min-w-11 min-h-11 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-frost hover:border-neonPink dark:hover:border-chartreuse transition-colors"
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
                      className="text-base font-semibold text-slate-900 dark:text-frost hover:text-neonPink dark:hover:text-chartreuse min-h-11 flex items-center px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/15 transition-colors"
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
                    className="w-full min-h-11 flex items-center justify-between px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-frost font-mono text-xs font-semibold hover:border-neonPink dark:hover:border-chartreuse transition-colors cursor-pointer"
                  >
                    <span>Command Palette</span>
                    <kbd className="text-xs font-mono text-neonPink dark:text-chartreuse bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                      Ctrl+K
                    </kbd>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenTerminal}
                    className="w-full min-h-11 flex items-center justify-between px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-frost font-mono text-xs font-semibold hover:border-neonPink dark:hover:border-chartreuse transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-neonPink dark:text-chartreuse font-bold font-mono text-sm">
                        &gt;_
                      </span>
                      <span>Launch Interactive Terminal</span>
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      READY
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 dark:border-white/10">
                <ResumeDownload className="w-full min-h-11 text-center text-sm font-bold py-3 px-4 rounded-full bg-chartreuse !text-midnight border border-black/20 shadow-lg hover:opacity-95 transition-all flex items-center justify-center cursor-pointer" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
