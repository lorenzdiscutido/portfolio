"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribeFinePointer(callback: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot(): boolean {
  return false;
}

export default function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 320, damping: 26, mass: 0.3 });
  const ringY = useSpring(cursorY, { stiffness: 320, damping: 26, mass: 0.3 });

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      data-testid="custom-cursor"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block"
    >
      {/* Ambient Translucent Magnetic Spring Halo (Native hardware pointer is preserved) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 44 : 26,
          height: isHovered ? 44 : 26,
          borderColor: isHovered ? "rgba(255, 122, 0, 0.75)" : "rgba(0, 82, 255, 0.45)",
          backgroundColor: isHovered ? "rgba(255, 122, 0, 0.08)" : "rgba(0, 82, 255, 0.04)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="fixed top-0 left-0 rounded-full border backdrop-blur-[1px] shadow-[0_0_12px_rgba(0,82,255,0.15)]"
      />
    </div>
  );
}
