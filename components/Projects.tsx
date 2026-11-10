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
  // Card 0: Full 12-col flagship hero card
  // Card 1: 7-col wide card
  // Card 2: 5-col compact card
  // Card 3+: 12-col wide card
  const spanClass =
    index === 0
      ? "md:col-span-12"
      : index === 1
      ? "md:col-span-7"
      : index === 2
      ? "md:col-span-5"
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
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 hover:border-[#0052FF]/50 transition-colors duration-200 flex flex-col ${spanClass}`}
    >
      {/* Flashlight Surface Glow Overlay (Visible only on group-hover) */}
      <motion.div
        aria-hidden="true"
        data-testid={`bento-spotlight-${index}`}
        style={{ background: spotlightBackground }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />

      {/* Flashlight Border Mask (Electric Blue glow along hovered edge) */}
      <motion.div
        aria-hidden="true"
        style={{
          WebkitMaskImage: spotlightBorderMask,
          maskImage: spotlightBorderMask,
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#0052FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-primary">
            {project.title}
          </h3>
          {isFeatured && (
            <span className="text-xs font-mono uppercase tracking-wider text-[#ea580c] dark:text-[#FF7A00] bg-[#ea580c]/10 dark:bg-[#FF7A00]/10 px-3 py-1 rounded-full border border-[#ea580c]/30 dark:border-[#FF7A00]/30 self-start sm:self-auto font-bold">
              Primary Architecture
            </span>
          )}
        </div>

        <p className="text-[#0052FF] dark:text-[#38bdf8] text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase mb-4">
          {project.role}
        </p>

        <p className="font-sans text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
          {project.overview}
        </p>

        {/* Quantified Metrics Highlight Bar (Rigid tabular columns, strict font-mono) */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-black/[0.03] dark:bg-base/40 border border-black/10 dark:border-white/5">
          {project.metrics.map((m, mi) => (
            <div key={mi} className="text-center sm:text-left">
              <span className="block text-sm sm:text-base font-extrabold text-[#0052FF] dark:text-[#38bdf8] tracking-tight font-mono">
                {m.value}
              </span>
              <span className="block text-xs font-mono text-slate-600 dark:text-slate-300 font-medium leading-tight">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="font-mono text-xs font-semibold text-primary bg-black/[0.04] dark:bg-surface/60 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 group-hover:border-[#0052FF]/50 dark:group-hover:border-[#38bdf8]/50 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold font-mono text-[#0052FF] dark:text-[#38bdf8] hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052FF] rounded-md"
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
    <section id="projects" className="py-20 px-4 sm:px-6 overflow-x-clip">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-[#0052FF] dark:text-[#38bdf8] font-mono font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">
            Selected Works
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
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
