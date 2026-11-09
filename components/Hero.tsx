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
            {/* Terminal Boot Sequence Prompt */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-neonPink dark:text-chartreuse font-semibold tracking-wider bg-white/70 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 px-3.5 py-1.5 rounded-full mb-5 shadow-sm"
            >
              <span>{typedText}</span>
              <span className="animate-pulse inline-block w-1.5 h-3.5 bg-neonPink dark:bg-chartreuse" />
            </motion.div>

            {/* Primary Headline & Role */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="theme-text-primary text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-3">
                Jose Lorenzo Discutido
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono">
                <span className="text-neonPink dark:text-chartreuse">
                  Systems &amp; Data Engineer
                </span>
              </p>
            </motion.div>

            {/* Value Proposition (Body Text) */}
            <motion.p
              variants={itemVariants}
              className="text-slate-700 dark:text-slate-300 text-base sm:text-lg mb-7 max-w-xl leading-relaxed"
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
                  className="min-h-11 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-chartreuse !text-midnight font-extrabold text-sm sm:text-base border border-chartreuse shadow-lg hover:bg-neonPink hover:!text-white hover:border-neonPink active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse"
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
                  className="min-h-11 bg-white/80 dark:bg-white/5 backdrop-blur-xl text-slate-900 dark:text-frost border border-black/15 dark:border-white/15 inline-flex items-center justify-center px-7 py-3.5 rounded-full hover:border-neonPink dark:hover:border-chartreuse hover:text-neonPink dark:hover:text-chartreuse active:scale-95 transition-all cursor-pointer font-bold text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse"
                >
                  <span>Contact Me</span>
                </a>
              </MagneticButton>

              <div className="md:hidden">
                <ResumeDownload className="min-h-11 px-6 py-3.5 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/15 dark:border-white/15 hover:border-neonPink dark:hover:border-chartreuse text-slate-900 dark:text-frost font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Frosted Glass Image Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              {/* Subtle Ambient Glow Backdrop */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-chartreuse/20 via-blue/15 to-neonPink/20 blur-xl opacity-75"
              />

              {/* Main Frosted Glass Image Frame */}
              <div className="relative aspect-[4/4.6] w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 bg-surface/80 backdrop-blur-xl shadow-2xl z-10">
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
                  <div className="w-full h-full flex flex-col items-center justify-center theme-text-primary bg-slate-100 dark:bg-surface p-6">
                    <span className="font-extrabold text-3xl tracking-tighter text-blue-600 dark:text-chartreuse">
                      JL<span className="text-neonPink">D</span>
                    </span>
                    <span className="text-xs uppercase font-mono theme-text-secondary tracking-widest mt-2">
                      Jose Lorenzo Discutido
                    </span>
                  </div>
                )}

                {/* Availability status badge */}
                <div className="absolute top-3 right-3 bg-midnight/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full flex items-center gap-2 shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chartreuse opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-chartreuse" />
                  </span>
                  <span className="text-xs font-mono font-medium text-frost">
                    Available
                  </span>
                </div>
              </div>

              {/* Frosted Glass "@lorenzdiscutido" pill badge at bottom-left */}
              <div className="theme-badge absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-3 -rotate-2 px-4 py-1.5 rounded-full backdrop-blur-xl border shadow-lg font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 z-20 hover:rotate-0 transition-transform">
                <span className="text-neonPink dark:text-chartreuse font-semibold">aka</span>
                <span>@lorenzdiscutido</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
