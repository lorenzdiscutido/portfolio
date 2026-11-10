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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 pt-24 lg:pt-32 pb-24 lg:pb-32 overflow-x-clip">
      <div className="max-w-6xl mx-auto w-full">
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
            {/* Primary Headline & Role */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-3 text-primary dark:text-frost">
                Jose Lorenzo Discutido
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-mono text-[#0052FF] dark:text-[#38bdf8] font-medium tracking-tight">
                Systems &amp; Data Engineer
              </p>
            </motion.div>

            {/* Value Proposition (Body Text) */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-slate-700 dark:text-slate-200 text-base sm:text-lg mb-7 max-w-xl leading-relaxed"
            >
              I build end-to-end ecosystems. From cyber-physical hardware and real-time mobile dashboards to AI-driven data pipelines, I specialize in architecting scalable infrastructure that bridges the physical and digital divide.
            </motion.p>

            {/* 3D Shader-Driven Magnetic Tech Nodes */}
            <motion.div variants={itemVariants}>
              <MagneticTechNodes />
            </motion.div>

            {/* Streamlined Conversion CTA Group */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mt-6"
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

          {/* Right Column: Matte Frosted Glass Image Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              {/* Subtle Ambient Blueprint Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#0052FF]/20 via-transparent to-[#38bdf8]/15 blur-xl opacity-60"
              />

              {/* Main Matte Frosted Glass Image Frame */}
              <div className="relative aspect-[4/4.8] w-full rounded-2xl overflow-hidden border-[0.5px] border-white/10 dark:border-white/10 border-black/5 bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] z-10 group">
                {!imageError ? (
                  <>
                    <Image
                      src="/profile.jpg"
                      alt="Jose Lorenzo Discutido"
                      fill
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 448px"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={() => setImageError(true)}
                      priority
                    />
                    {/* Subtle Architectural Gradient to melt the bottom into the background */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />

                    {/* Minimalist Engineer Identity Plate */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 px-3 py-2 rounded-xl bg-black/60 dark:bg-[#0e1117]/80 backdrop-blur-md border-[0.5px] border-white/15 text-[11px] font-mono flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span className="text-white font-medium truncate">Jose Lorenzo Discutido</span>
                      </div>
                      <span className="text-[#38bdf8] text-[10px] shrink-0 font-medium">BS CpE • PUP</span>
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
