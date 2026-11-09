"use client";

import { motion } from "framer-motion";

export default function LiveTelemetryDot() {
  return (
    <span className="relative flex items-center justify-center w-2 h-2 shrink-0">
      <motion.span
        animate={{
          scale: [1, 1.85, 1],
          opacity: [0.85, 0.2, 0.85],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inline-flex w-1.5 h-1.5 rounded-full bg-neonPink dark:bg-chartreuse"
      />
      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-neonPink dark:bg-chartreuse shadow-[0_0_8px_#CCFF00]" />
    </span>
  );
}
