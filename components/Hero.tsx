"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import TelemetryBar from "@/components/TelemetryBar";
import ResumeDownload from "@/components/ResumeDownload";
import MagneticButton from "@/components/MagneticButton";
import MagneticTechNodes from "@/components/MagneticTechNodes";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-14 lg:pb-16 overflow-x-clip">
      <div className="max-w-7xl mx-auto w-full">
        {/* Edge Telemetry HUD Bar */}
        <TelemetryBar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Responsive Spring Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-left order-2 lg:order-1"
          >
            {/* Identity Eyebrow */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="text-[#0052FF] dark:text-[#38bdf8] font-mono text-xs font-semibold tracking-widest uppercase">
                ENGINEERING PORTFOLIO // 2026
              </span>
              <span className="text-muted/40 font-mono text-xs">•</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            </motion.div>

            {/* Primary Headline & Role */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-3 text-primary dark:text-frost">
                <span className="sr-only">Jose Lorenzo Discutido</span>
                <span aria-hidden="true">Lorenz Discutido</span>
              </h1>
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-xl sm:text-2xl lg:text-3xl font-mono text-[#0052FF] dark:text-[#38bdf8] font-bold tracking-tight">
                  Digital Data &amp; Systems Engineer
                </p>
                <span className="px-2.5 py-0.5 rounded-md bg-[#0052FF]/10 dark:bg-[#0052FF]/20 border border-[#0052FF]/30 text-[#0052FF] dark:text-[#38bdf8] font-mono text-xs font-semibold">
                  BS CpE • PUP
                </span>
              </div>
            </motion.div>

            {/* Value Proposition (Body Text) */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-slate-700 dark:text-slate-200 text-base sm:text-lg mb-6 max-w-xl leading-relaxed text-pretty"
            >
              Bridging cyber-physical kiosk fleets with enterprise cloud governance, zero-trust WireGuard mesh topologies, and multimodal Gemini AI vision.
            </motion.p>

            {/* Empirical Metric Callouts */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:gap-6 max-w-xl py-4 border-t border-black/10 dark:border-white/10 mb-6"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary dark:text-frost tracking-tight font-mono tabular-nums">
                  4,750+
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-cyan-500/80 dark:text-cyan-400/80 text-[#0052FF]/80 uppercase tracking-wider mt-1">
                  Defects Processed
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary dark:text-frost tracking-tight font-mono tabular-nums">
                  0ms
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-cyan-500/80 dark:text-cyan-400/80 text-[#0052FF]/80 uppercase tracking-wider mt-1">
                  Split-Brain Failover
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary dark:text-frost tracking-tight font-mono tabular-nums">
                  100%
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-cyan-500/80 dark:text-cyan-400/80 text-[#0052FF]/80 uppercase tracking-wider mt-1">
                  Zero-Trust Intune
                </div>
              </div>
            </motion.div>

            {/* 3D Shader-Driven Magnetic Tech Nodes */}
            <motion.div variants={itemVariants} className="mb-6">
              <MagneticTechNodes />
            </motion.div>

            {/* Streamlined Conversion CTA Group */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Primary Authoritative Conversion Action: Resume */}
              <MagneticButton strength={0.25}>
                <ResumeDownload
                  label="Download Curriculum Vitae (PDF)"
                  className="min-h-12 px-6 sm:px-7 py-3 rounded-full bg-[#0052FF] hover:bg-[#0041cc] text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(0,82,255,0.25)] hover:shadow-[0_0_25px_rgba(0,82,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue/50"
                />
              </MagneticButton>

              {/* Secondary Conversion Action: Contact Me */}
              <MagneticButton strength={0.2}>
                <a
                  href="#contact"
                  data-magnetic="true"
                  className="min-h-12 px-6 sm:px-7 py-3 rounded-full bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl text-primary font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-electricBlue/50 hover:text-[#0052FF] dark:hover:text-[#38bdf8] inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue/50"
                >
                  <span>Contact Me</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </MagneticButton>

              {/* Exploration Anchor: View Projects */}
              <MagneticButton strength={0.15}>
                <a
                  href="#projects"
                  data-magnetic="true"
                  className="min-h-12 px-5 py-3 rounded-full text-muted hover:text-primary font-mono text-xs uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electricBlue/50"
                >
                  <span>View Projects</span>
                  <span aria-hidden="true">&darr;</span>
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Column: Seamlessly Embedded Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none h-[400px] sm:h-[480px] lg:h-[540px] xl:h-[600px] overflow-hidden select-none">
              {!imageError ? (
                <>
                  <Image
                    src="/profile.jpg"
                    alt="Jose Lorenzo Discutido"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                    onError={() => setImageError(true)}
                    priority
                  />

                  {/* Left Melt Gradient: seamlessly blends portrait studio background into obsidian page atmosphere */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute inset-y-0 left-0 w-36 xl:w-56 bg-gradient-to-r from-base via-base/80 to-transparent pointer-events-none z-10"
                  />

                  {/* Bottom Melt Gradient: dissolves the portrait baseline cleanly into the background */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-base via-base/85 to-transparent pointer-events-none z-10"
                  />

                  {/* Subtle Top & Right Feather Gradients */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-base/40 to-transparent pointer-events-none z-10"
                  />
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-base/40 to-transparent pointer-events-none z-10"
                  />

                  {/* Docked Tailnet Telemetry Badge */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 px-3.5 py-2 rounded-xl bg-black/80 dark:bg-[#0e1117]/90 backdrop-blur-md border-[0.5px] border-[#38bdf8]/40 text-[#38bdf8] text-[11px] sm:text-xs font-mono tracking-wider flex items-center gap-2 shadow-2xl select-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>SYS: ONLINE // TAILNET 100.64.0.0/10</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-surface p-6 text-primary">
                  <span className="font-medium text-3xl tracking-tighter text-[#0052FF]">
                    JL<span>D</span>
                  </span>
                  <span className="text-[11px] uppercase font-mono text-muted tracking-widest mt-2">
                    Jose Lorenzo Discutido
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
