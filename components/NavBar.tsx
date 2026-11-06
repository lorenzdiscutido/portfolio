"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ResumeDownload from "@/components/ResumeDownload";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "[ ./home ]", hoverColor: "hover:text-orange-600 dark:hover:text-orange" },
    { href: "/#projects", label: "[ ./projects ]", hoverColor: "hover:text-blue-600 dark:hover:text-blue-400" },
    { href: "/#experience", label: "[ ./experience ]", hoverColor: "hover:text-orange-600 dark:hover:text-orange" },
    { href: "/blog", label: "[ ./blog ]", hoverColor: "hover:text-blue-600 dark:hover:text-blue-400" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0f1115]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Terminal Shell Prompt Brand */}
        <Link
          href="/"
          className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-wider flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
        >
          <span className="text-orange-700 dark:text-orange font-bold">&gt;</span> jld-sys
          <span className="text-blue-600 dark:text-blue-400 font-bold">:~$</span>
        </Link>

        {/* Desktop GUI Command Palette Links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-xs lg:text-sm text-slate-600 dark:text-slate-400 ${link.hoverColor} transition-colors min-h-[44px] flex items-center px-2.5 py-1.5 rounded-md hover:bg-black/[0.03] dark:hover:bg-white/5`}
            >
              {link.label}
            </Link>
          ))}

          {/* Clickable Resume PDF Action */}
          <ResumeDownload
            label="[ ./resume.pdf ]"
            className="font-mono text-xs lg:text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange transition-colors min-h-[44px] flex items-center px-2.5 py-1.5 rounded-md hover:bg-black/[0.03] dark:hover:bg-white/5 cursor-pointer"
          />

          <div className="pl-2 border-l border-black/10 dark:border-white/10">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Viewport Header Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200 font-mono text-xs hover:border-orange dark:hover:border-orange transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? "[ close ]" : "[ menu ]"}
          </button>
        </div>
      </nav>

      {/* Mobile Command Palette Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0f1115]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-mono text-sm text-slate-700 dark:text-slate-300 ${link.hoverColor} min-h-[44px] flex items-center px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 transition-colors`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-1">
            <ResumeDownload
              label="[ ./resume.pdf ]"
              className="w-full font-mono text-sm text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange min-h-[44px] flex items-center justify-start px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 transition-colors cursor-pointer"
            />
          </div>
        </div>
      )}
    </header>
  );
}
