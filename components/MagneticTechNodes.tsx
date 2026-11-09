"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TechNodeSpec {
  id: string;
  label: string;
  glyph: string;
}

const TECH_NODES: TechNodeSpec[] = [
  { id: "python-next", label: "Python / Next.js", glyph: "PY//NX" },
  { id: "dart-flutter", label: "Dart / Flutter", glyph: "DT//FL" },
  { id: "firebase-mysql", label: "Firebase / MySQL", glyph: "FB//SQL" },
  { id: "cpp-iot", label: "C++ / IoT", glyph: "MCU//IO" },
  { id: "odoo-cloud", label: "Odoo / Cloud", glyph: "ERP//CL" },
];

function InteractivePlaneNode({
  node,
  index,
}: {
  node: TechNodeSpec;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isSnapped, setIsSnapped] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 400, damping: 25 });
  const y = useSpring(rawY, { stiffness: 400, damping: 25 });
  const rotateX = useSpring(rawRotateX, { stiffness: 400, damping: 25 });
  const rotateY = useSpring(rawRotateY, { stiffness: 400, damping: 25 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      // 100px proximity threshold for magnetic snap & 3D plane tilt
      if (distance <= 100) {
        const pullFactor = (1 - distance / 100) * 0.42;
        rawX.set(dx * pullFactor);
        rawY.set(dy * pullFactor);

        // Tilt plane on X/Y axes based on approach angle
        rawRotateX.set((-dy / 100) * 20);
        rawRotateY.set((dx / 100) * 20);
        setIsSnapped(true);
      } else {
        rawX.set(0);
        rawY.set(0);
        rawRotateX.set(0);
        rawRotateY.set(0);
        setIsSnapped(false);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [rawX, rawY, rawRotateX, rawRotateY]);

  return (
    <div className="[perspective:800px] inline-block">
      <motion.div
        ref={ref}
        data-testid={`magnetic-node-${node.id}`}
        data-snapped={isSnapped}
        style={{
          x,
          y,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          translateY: [0, index % 2 === 0 ? -2 : 2, 0],
        }}
        transition={{
          translateY: {
            duration: 3 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className={`relative select-none font-mono text-xs font-semibold px-3.5 py-2 rounded-xl backdrop-blur-md transition-colors duration-200 flex items-center gap-2 border shadow-none cursor-pointer ${
          isSnapped
            ? "bg-[#0052FF]/15 border-[#0052FF] text-primary"
            : "bg-surface/80 border-black/10 dark:border-white/5 text-primary hover:border-[#0052FF]/50"
        }`}
      >
        {/* Node Status Dot */}
        <span
          aria-hidden="true"
          className={`w-1.5 h-1.5 rounded-full transition-transform duration-200 ${
            isSnapped
              ? "bg-[#FF7A00] scale-150 shadow-[0_0_8px_#FF7A00]"
              : "bg-[#0052FF] scale-100"
          }`}
        />
        <span className="text-[10px] uppercase tracking-wider text-[#0052FF] font-bold">
          {node.glyph}
        </span>
        <span>{node.label}</span>
      </motion.div>
    </div>
  );
}

export default function MagneticTechNodes() {
  return (
    <div
      data-testid="magnetic-tech-nodes"
      className="flex flex-wrap items-center gap-3 mb-8"
    >
      {TECH_NODES.map((node, index) => (
        <InteractivePlaneNode key={node.id} node={node} index={index} />
      ))}
    </div>
  );
}
