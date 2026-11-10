"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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

            {/* Magnetic CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 items-center justify-start mt-6"
            >
              <MagneticButton strength={0.3}>
                <a
                  href="#projects"
                  data-magnetic="true"
                  className="min-h-11 inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#0052FF] text-white font-medium text-sm sm:text-base border border-[#0052FF] shadow-none hover:bg-[#0041cc] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
                >
                  <span>View Projects</span>
                  <span aria-hidden="true" className="font-medium">
                    &rarr;
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <ResumeDownload className="min-h-11 px-6 sm:px-7 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium text-sm sm:text-base border border-slate-800 dark:border-slate-200 shadow-sm hover:opacity-90 active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue/50" />
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <a
                  href="#contact"
                  data-magnetic="true"
                  className="min-h-11 bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl text-primary border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full hover:border-electricBlue/50 hover:text-[#0052FF] dark:hover:text-[#38bdf8] active:scale-95 transition-all duration-200 cursor-pointer font-medium text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
                >
                  <span>Contact Me</span>
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
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#0052FF]/20 via-transparent to-[#FF7A00]/10 blur-xl opacity-60"
              />

              {/* Main Matte Frosted Glass Image Frame */}
              <div className="relative aspect-[4/4.6] w-full rounded-2xl overflow-hidden border-[0.5px] border-white/10 dark:border-white/10 border-black/5 bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] z-10">
                {!imageError ? (
                  <Image
                    src="/profile.jpg"
                    alt="Jose Lorenzo Discutido"
                    fill
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 448px"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImageError(true)}
                    priority
                  />
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
