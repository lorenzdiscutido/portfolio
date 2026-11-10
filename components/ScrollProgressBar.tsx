"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
    >
      {/* Subtle track background */}
      <div className="absolute inset-0 bg-transparent" />
      {/* Dynamic Electric Blue Progress Fill */}
      <motion.div
        data-testid="scroll-progress-bar"
        style={{ scaleX }}
        className="h-full w-full bg-gradient-to-r from-[#0052FF] via-[#38bdf8] to-[#0052FF] origin-left shadow-[0_0_10px_rgba(0,82,255,0.8),0_0_20px_rgba(56,189,248,0.5)]"
      />
    </div>
  );
}
