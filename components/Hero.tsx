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
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const fullText = "> guest@jld-sys:~$ initiating profile...";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 pt-16 lg:pt-24 pb-16 overflow-x-clip">
      <div className="max-w-6xl mx-auto w-full">
        {/* Edge Telemetry HUD Bar */}
        <TelemetryBar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Staggered Upward Text Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-left order-2 lg:order-1"
          >
            {/* Authentic Terminal Prompt Window */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-lg mb-6 rounded-xl bg-[#0f1115] border border-white/5 overflow-hidden shadow-none"
            >
              {/* Solid Top Bar with standard OS dots */}
              <div className="bg-[#1e2128] px-3.5 py-2 border-b border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                </div>
                <span className="text-slate-400 text-[11px] font-mono">guest@jld-sys: ~ (zsh)</span>
                <span className="text-[10px] font-mono text-[#0052FF] font-semibold">ssh</span>
              </div>
              {/* Terminal Body with #f8fafc text and #FF7A00 blinking cursor */}
              <div className="p-3.5 font-mono text-xs md:text-sm text-[#f8fafc] flex items-center gap-2">
                <span>{typedText}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-[#FF7A00]" />
              </div>
            </motion.div>

            {/* Primary Headline & Role */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-3 text-slate-900 dark:text-[#f8fafc]">
                Jose Lorenzo Discutido
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono">
                <span className="text-[#0052FF]">
                  Systems &amp; Data Engineer
                </span>
              </p>
            </motion.div>

            {/* Value Proposition (Body Text) */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-slate-700 dark:text-slate-300 text-base sm:text-lg mb-7 max-w-xl leading-relaxed"
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
              className="flex flex-wrap gap-4 items-center justify-start"
            >
              <MagneticButton strength={0.3}>
                <a
                  href="#projects"
                  data-magnetic="true"
                  className="min-h-11 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0052FF] text-white font-extrabold text-sm sm:text-base border border-[#0052FF] shadow-none hover:bg-[#0041cc] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
                >
                  <span>View Projects</span>
                  <span aria-hidden="true" className="font-bold">
                    &rarr;
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href="#contact"
                  data-magnetic="true"
                  className="min-h-11 bg-white/80 dark:bg-[#1e2128]/80 backdrop-blur-md text-slate-900 dark:text-[#f8fafc] border border-black/15 dark:border-white/5 inline-flex items-center justify-center px-7 py-3.5 rounded-full hover:border-[#0052FF]/50 hover:text-[#0052FF] active:scale-95 transition-all cursor-pointer font-bold text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
                >
                  <span>Contact Me</span>
                </a>
              </MagneticButton>

              <div className="md:hidden">
                <ResumeDownload className="min-h-11 px-6 py-3.5 rounded-full bg-white/80 dark:bg-[#1e2128]/80 backdrop-blur-md border border-black/15 dark:border-white/5 hover:border-[#0052FF]/50 text-slate-900 dark:text-[#f8fafc] font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Matte Frosted Glass Image Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              {/* Subtle Ambient Blueprint Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#0052FF]/20 via-transparent to-[#FF7A00]/10 blur-xl opacity-60"
              />

              {/* Main Matte Frosted Glass Image Frame */}
              <div className="relative aspect-[4/4.6] w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/5 bg-[#1e2128]/80 backdrop-blur-md shadow-none z-10">
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
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-[#1e2128] p-6 text-[#f8fafc]">
                    <span className="font-extrabold text-3xl tracking-tighter text-[#0052FF]">
                      JL<span>D</span>
                    </span>
                    <span className="text-xs uppercase font-mono text-slate-400 tracking-widest mt-2">
                      Jose Lorenzo Discutido
                    </span>
                  </div>
                )}

                {/* Availability status badge */}
                <div className="absolute top-3 right-3 bg-[#0f1115]/90 backdrop-blur-md border border-white/5 px-3 py-1 rounded-full flex items-center gap-2 shadow-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                  </span>
                  <span className="text-xs font-mono font-medium text-[#f8fafc]">
                    Available
                  </span>
                </div>
              </div>

              {/* Frosted Glass "@lorenzdiscutido" pill badge at bottom-left */}
              <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-3 -rotate-2 px-4 py-1.5 rounded-full bg-[#1e2128]/90 backdrop-blur-md border border-white/5 text-[#f8fafc] shadow-none font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 z-20 hover:rotate-0 transition-transform">
                <span className="text-[#0052FF] font-semibold">aka</span>
                <span>@lorenzdiscutido</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
