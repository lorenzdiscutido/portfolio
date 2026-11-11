"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface TechNodeSpec {
  id: string;
  label: string;
  glyph: string;
  filterCategory: "all" | "ai-vision" | "cyber-physical" | "mobile" | "distributed" | "enterprise";
  targetSlug?: string;
  targetAnchor?: string;
  actionHint: string;
}

export const TECH_NODES: TechNodeSpec[] = [
  {
    id: "python-next",
    label: "Python • Next.js",
    glyph: "Full-Stack",
    filterCategory: "ai-vision",
    targetSlug: "vonotec-defect-logger",
    actionHint: "Filter: AI Vision & Pipelines",
  },
  {
    id: "dart-flutter",
    label: "Dart • Flutter",
    glyph: "Mobile",
    filterCategory: "mobile",
    targetSlug: "komunikonek",
    actionHint: "Filter: Mobile & Offline Sync",
  },
  {
    id: "firebase-mysql",
    label: "Tailscale • MySQL",
    glyph: "Distributed",
    filterCategory: "distributed",
    actionHint: "Filter: Zero-Trust Mesh & GTID",
  },
  {
    id: "cpp-iot",
    label: "C++ • Microcontrollers",
    glyph: "Embedded",
    filterCategory: "cyber-physical",
    targetSlug: "iskiosk-terminal",
    actionHint: "Filter: Cyber-Physical Kiosks",
  },
  {
    id: "odoo-cloud",
    label: "Entra ID • Intune",
    glyph: "Enterprise",
    filterCategory: "enterprise",
    targetSlug: "vonotec-defect-logger",
    actionHint: "Filter: Enterprise Governance",
  },
];

function InteractivePlaneNode({
  node,
  index,
  onSelectNode,
}: {
  node: TechNodeSpec;
  index: number;
  onSelectNode: (node: TechNodeSpec) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 400, damping: 30 });
  const y = useSpring(rawY, { stiffness: 400, damping: 30 });
  const rotateX = useSpring(rawRotateX, { stiffness: 400, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 400, damping: 30 });

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

  const handleClick = () => {
    onSelectNode(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectNode(node);
    }
  };

  return (
    <div className="[perspective:800px] inline-block">
      <motion.div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={`${node.glyph}: ${node.label} — ${node.actionHint}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
        className={`group relative select-none font-mono text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-xl backdrop-blur-xl transition-all duration-200 flex items-center gap-2 border-[0.5px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-electricBlue/70 active:scale-95 ${
          isSnapped || isHovered
            ? "bg-[#0052FF]/15 border-electricBlue/60 text-primary shadow-[0_0_14px_rgba(0,82,255,0.25)]"
            : "bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] text-primary hover:border-electricBlue/50 hover:shadow-[0_0_10px_rgba(0,82,255,0.12)]"
        }`}
      >
        {/* Node Status Dot */}
        <span
          aria-hidden="true"
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 shrink-0 ${
            isSnapped || isHovered
              ? "bg-[#38bdf8] scale-125 shadow-[0_0_10px_#38bdf8]"
              : "bg-[#0052FF] dark:bg-[#38bdf8] scale-100"
          }`}
        />
        <span className="text-[10px] uppercase tracking-wider text-[#0052FF] dark:text-[#38bdf8] font-bold shrink-0">
          {node.glyph}
        </span>
        <span className="tracking-normal font-sans font-medium text-xs text-primary">{node.label}</span>

        {/* Dynamic Action Arrow on Hover */}
        <span
          aria-hidden="true"
          className={`text-[10px] font-mono text-[#0052FF] dark:text-[#38bdf8] transition-all duration-200 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
          }`}
        >
          &rarr;
        </span>
      </motion.div>
    </div>
  );
}

export default function MagneticTechNodes() {
  const handleSelectNode = useCallback((node: TechNodeSpec) => {
    // Dispatch custom event for project filter
    window.dispatchEvent(
      new CustomEvent("filter-projects", {
        detail: {
          category: node.filterCategory,
          slug: node.targetSlug,
          label: node.label,
        },
      })
    );

    // Smoothly scroll to the Projects section
    const targetElement = document.getElementById("projects");
    if (targetElement) {
      const navOffset = 90; // account for sticky floating navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div
      data-testid="magnetic-tech-nodes"
      className="flex flex-wrap items-center gap-2 mb-8"
      role="group"
      aria-label="Filter portfolio projects by technology node"
    >
      {TECH_NODES.map((node, index) => (
        <InteractivePlaneNode
          key={node.id}
          node={node}
          index={index}
          onSelectNode={handleSelectNode}
        />
      ))}
    </div>
  );
}
