"use client";

import React from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { caseStudies, type CaseStudy } from "@/lib/caseStudyData";

interface SpotlightBentoCardProps {
  project: CaseStudy;
  index: number;
}

function SpotlightBentoCard({ project, index }: SpotlightBentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform cursor coordinates into radial spotlight masks & glows
  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(0, 82, 255, 0.15), rgba(255, 122, 0, 0.05) 50%, transparent 80%)`;
  const spotlightBorderMask = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`;
  const tiltX = useTransform(mouseY, [0, 400], [1.2, -1.2]);
  const tiltY = useTransform(mouseX, [0, 600], [-1.2, 1.2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Asymmetric Bento Grid spans:
  // Card 0: 8-col feature showcase
  // Card 1: 4-col tight data card
  // Card 2+: 12-col locked showcase
  const spanClass =
    index === 0
      ? "md:col-span-8"
      : index === 1
      ? "md:col-span-4"
      : "md:col-span-12";

  const isFeatured = index === 0;

  return (
    <motion.div
      data-testid={`bento-card-${index}`}
      onMouseMove={handleMouseMove}
      style={{ rotateX: tiltX, rotateY: tiltY }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-electricBlue/50 dark:hover:border-electricBlue/50 hover:shadow-[0_0_20px_rgba(0,82,255,0.15)] dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 flex flex-col col-span-12 ${spanClass}`}
    >
      {/* Flashlight Surface Glow Overlay (Visible only on group-hover) */}
      <motion.div
        aria-hidden="true"
        data-testid={`bento-spotlight-${index}`}
        style={{ background: spotlightBackground }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />

      {/* Flashlight Border Mask (Subtle hairline highlight along hovered edge) */}
      <motion.div
        aria-hidden="true"
        style={{
          WebkitMaskImage: spotlightBorderMask,
          maskImage: spotlightBorderMask,
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl border-[0.5px] border-[#0052FF] dark:border-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3 className="font-sans text-xl sm:text-2xl font-medium tracking-tight text-primary dark:text-frost">
            {project.title}
          </h3>
          {isFeatured && (
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] dark:text-[#FF7A00] bg-[#ea580c]/10 dark:bg-[#FF7A00]/10 px-3 py-1 rounded-full border-[0.5px] border-[#ea580c]/30 dark:border-[#FF7A00]/30 self-start sm:self-auto font-medium">
              Primary Architecture
            </span>
          )}
        </div>

        <p className="text-[#0052FF] dark:text-[#38bdf8] text-[11px] font-mono font-medium tracking-widest uppercase mb-4">
          {project.role}
        </p>

        <p className="font-sans text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
          {project.overview}
        </p>

        {/* Quantified Metrics Highlight Bar (Rigid tabular columns, strict font-mono) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-4 rounded-xl bg-black/[0.03] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          {project.metrics.map((m, mi) => (
            <div key={mi} className="text-center sm:text-left">
              <span className="block text-sm sm:text-base font-semibold text-[#0052FF] dark:text-[#38bdf8] tracking-tight font-mono">
                {m.value}
              </span>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-muted font-medium leading-tight mt-0.5">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="font-mono text-[11px] uppercase tracking-wider font-medium text-primary bg-black/[0.04] dark:bg-surface/60 px-2.5 py-1 rounded-full border-[0.5px] border-white/10 dark:border-white/10 border-black/5 group-hover:border-electricBlue/50 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium font-mono text-[#0052FF] dark:text-[#38bdf8] hover:text-primary dark:hover:text-frost transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052FF] rounded-md uppercase tracking-wider"
          >
            <span>View Architecture &amp; Case Study</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32 px-4 sm:px-6 overflow-x-clip">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-[#0052FF] dark:text-[#38bdf8] font-mono font-medium tracking-widest uppercase mb-2 text-[11px]">
            Selected Works
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-medium text-primary dark:text-frost tracking-tight">
            Spotlight <span className="text-[#0052FF] dark:text-[#38bdf8]">Bento Grid</span>
          </h2>
        </div>

        <div
          data-testid="bento-grid"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {caseStudies.map((project, index) => (
            <SpotlightBentoCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
