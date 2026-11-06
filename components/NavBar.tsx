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
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0c0e12]/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-slate-900 dark:text-white font-extrabold text-xl tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 flex items-center gap-1.5"
        >
          <span className="text-orange-700 dark:text-orange font-mono">&gt;</span> Lorenz
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <ResumeDownload
            className="px-4 py-2 rounded-lg bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange text-slate-900 dark:text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:scale-105"
          />

          <ThemeToggle />
        </div>

        {/* Mobile Viewport Header Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200 text-sm font-medium hover:border-orange dark:hover:border-orange transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0e12]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2">
            <ResumeDownload
              className="w-full text-center text-sm font-medium py-2.5 px-4 rounded-lg bg-orange !text-black font-bold hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
            />
          </div>
        </div>
      )}
    </header>
  );
}
