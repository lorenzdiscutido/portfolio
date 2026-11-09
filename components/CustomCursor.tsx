"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 320, damping: 26, mass: 0.3 });
  const ringY = useSpring(cursorY, { stiffness: 320, damping: 26, mass: 0.3 });

  useEffect(() => {
    const canUseFinePointer =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: fine)").matches;

    if (!canUseFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target && typeof target.closest === "function") {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-magnetic="true"]'
        );
        setIsHovered(Boolean(interactive));
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      data-testid="custom-cursor"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block"
    >
      {/* Core Stealth Electric Blue Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#0052FF] shadow-[0_0_10px_#0052FF]"
      />

      {/* Translucent Expanding Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 40 : 22,
          height: isHovered ? 40 : 22,
          borderColor: isHovered ? "rgba(255, 122, 0, 0.8)" : "rgba(0, 82, 255, 0.4)",
          backgroundColor: isHovered ? "rgba(255, 122, 0, 0.08)" : "rgba(0, 82, 255, 0.03)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 rounded-full border backdrop-blur-[1px]"
      />
    </div>
  );
}
