"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ResumeDownload from "@/components/ResumeDownload";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "./home" },
    { href: "/#projects", label: "./projects" },
    { href: "/#experience", label: "./experience" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0c0e12]/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Terminal Prompt Brand — Zero space gap between hostname and path */}
        <Link
          href="/"
          className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wider inline-flex items-center hover:opacity-80 transition-opacity py-2"
        >
          <span className="text-orange-700 dark:text-orange font-bold mr-1.5">&gt;</span>
          <span>jld-sys<span className="text-blue-600 dark:text-blue-400 font-bold">:~$</span></span>
        </Link>

        {/* Desktop GUI Command Palette Dock */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group px-3 py-1.5 rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10 transition-all font-mono text-xs font-semibold flex items-center cursor-pointer"
              >
                <span className="text-slate-400 dark:text-slate-500 font-normal select-none mr-0.5">[</span>
                <span className="text-slate-700 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange transition-colors">
                  {link.label}
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-normal select-none ml-0.5">]</span>
              </Link>
            ))}

            {/* Clickable Resume PDF Action in Matching Command Dock Style */}
            <ResumeDownload
              label="./resume.pdf"
              className="group px-3 py-1.5 rounded-lg hover:bg-black/[0.06] dark:hover:bg-white/10 transition-all font-mono text-xs font-semibold flex items-center cursor-pointer"
            />
          </div>

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
            className="min-w-[44px] min-h-[44px] flex items-center justify-center px-3 py-2 rounded-xl bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold hover:border-orange dark:hover:border-orange transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? "[ close ]" : "[ menu ]"}
          </button>
        </div>
      </nav>

      {/* Mobile Command Palette Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0e12]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 transition-colors"
            >
              <span className="text-slate-400 dark:text-slate-500 select-none mr-1">[</span>
              <span>{link.label}</span>
              <span className="text-slate-400 dark:text-slate-500 select-none ml-1">]</span>
            </Link>
          ))}

          <div className="pt-1">
            <ResumeDownload
              label="./resume.pdf"
              className="w-full font-mono text-sm text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange min-h-[44px] flex items-center justify-start px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 transition-colors cursor-pointer"
            />
          </div>
        </div>
      )}
    </header>
  );
}
