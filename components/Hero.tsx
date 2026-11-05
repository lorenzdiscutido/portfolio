"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TelemetryBar from "@/components/TelemetryBar";
import ResumeDownload from "@/components/ResumeDownload";

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
    <section className="min-h-[85vh] flex flex-col justify-center px-6 pt-24 lg:pt-32 pb-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Edge Telemetry HUD Bar */}
        <TelemetryBar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 text-left order-2 lg:order-1"
          >
            {/* Terminal Boot Sequence Prompt */}
            <div className="inline-flex items-center gap-1.5 font-mono text-xs md:text-sm text-orange-700 dark:text-orange font-semibold tracking-wider bg-orange-50 dark:bg-white/5 border border-orange-200/70 dark:border-white/10 px-3 py-1 rounded-md mb-4">
              <span>{typedText}</span>
              <span className="animate-pulse inline-block w-1.5 h-3.5 bg-orange-600 dark:bg-orange"></span>
            </div>

            {/* Primary Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="theme-text-primary text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6"
            >
              Hi, I&apos;m Jose Lorenzo Discutido.
              <br />
              <span className="theme-text-primary">
                I build hardware integrations and automate enterprise cloud.
              </span>
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="theme-text-secondary text-base sm:text-lg mb-8 max-w-xl leading-relaxed"
            >
              Computer Engineering graduate specializing in Big Data Analytics and cyber-physical systems. I focus on eliminating operational bottlenecks—from active-active MySQL database meshes over Tailscale to multimodal AI defect logging and microcontroller-driven kiosk terminals. Currently architecting enterprise systems at Vonotec.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-4 items-center justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ x: 2, y: 2 }}
                whileTap={{ x: 4, y: 4, scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange !text-black font-bold text-sm sm:text-base border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] active:shadow-none transition-all cursor-pointer"
              >
                <span className="!text-black font-bold">View Projects</span>
                <span aria-hidden="true" className="!text-black font-bold">&rarr;</span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ x: 2, y: 2 }}
                whileTap={{ x: 4, y: 4, scale: 0.98 }}
                className="theme-btn-white bg-white dark:bg-[#1e2128] text-black dark:text-white border-black dark:border-white/30 inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 shadow-[4px_4px_0px_0px_#000000] hover:bg-slate-100 dark:hover:bg-[#282c37] hover:!text-blue-600 dark:hover:!text-blue-400 hover:shadow-[2px_2px_0px_0px_#000000] active:shadow-none transition-all cursor-pointer font-bold text-sm sm:text-base"
              >
                <span className="text-black dark:text-white font-bold">Contact Me</span>
              </motion.a>

              <div className="md:hidden">
                <ResumeDownload className="px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-[#1e2128] border-2 border-black dark:border-white/30 hover:border-orange dark:hover:border-orange text-slate-900 dark:text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Image Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              {/* Hard black offset shadow backdrop */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black dark:bg-black rounded-2xl translate-x-3 translate-y-3 sm:translate-x-3.5 sm:translate-y-3.5 border-2 border-black dark:border-black"
              />

              {/* Main Image Frame */}
              <div className="relative aspect-[4/4.6] w-full rounded-2xl overflow-hidden border-2 border-black dark:border-white/20 bg-surface shadow-2xl z-[1]">
                {!imageError ? (
                  <Image
                    src="/profile.jpg"
                    alt="Jose Lorenzo Discutido"
                    fill
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 420px"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center theme-text-primary bg-slate-100 dark:bg-surface p-6">
                    <span className="font-extrabold text-3xl tracking-tighter text-blue-600 dark:text-blue-400">
                      JL<span className="text-orange-600 dark:text-orange">D</span>
                    </span>
                    <span className="text-xs uppercase font-mono theme-text-secondary tracking-widest mt-2">
                      Jose Lorenzo Discutido
                    </span>
                  </div>
                )}

                {/* Availability status badge */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-mono font-medium text-emerald-400">
                    Available
                  </span>
                </div>
              </div>

              {/* Tilted "aka @lorenzdiscutido" pill badge at bottom-left */}
              <div className="theme-badge absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 -rotate-3 px-4 py-1.5 rounded-xl border-2 shadow-[3px_3px_0px_0px_#000000] font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 z-10 hover:rotate-0 transition-transform">
                <span className="text-orange-700 dark:text-orange font-semibold">aka</span>
                <span>@lorenzdiscutido</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
