"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(pointer: fine)").matches;
}

function MagneticButtonActive({
  children,
  className,
  strength,
}: {
  children: React.ReactNode;
  className: string;
  strength: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 400, damping: 30, mass: 0.1 });
  const y = useSpring(rawY, { stiffness: 400, damping: 30, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rawX.set((e.clientX - centerX) * strength);
    rawY.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function MagneticButton({
  children,
  className = "inline-block",
  strength = 0.28,
}: MagneticButtonProps) {
  const isFine = useSyncExternalStore(subscribePointer, getPointerSnapshot, () => false);

  if (!isFine) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MagneticButtonActive className={className} strength={strength}>
      {children}
    </MagneticButtonActive>
  );
}
