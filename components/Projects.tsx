"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [vonotecTab, setVonotecTab] = useState<"dual" | "intake" | "analytics" | "sharepoint">("dual");

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

        <p className="font-sans text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
          {project.overview}
        </p>

        {/* Vonotec Automated Defect Logger Web App & Dashboard Showcase */}
        {(project.slug === "vonotec-defect-logger" || project.slug === "gemini-defect-logger") && (
          <div className="mb-6 rounded-xl overflow-hidden bg-black/[0.04] dark:bg-base/80 border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] font-mono flex-grow flex flex-col">
            {/* Header Telemetry & Interactive Tab Controller */}
            <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-black/[0.03] dark:bg-black/40 border-b-[0.5px] border-white/10 text-[10px] gap-2">
              <span className="flex items-center gap-1.5 text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-widest font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] dark:bg-[#38bdf8] animate-pulse" />
                Live Web Application Studio
              </span>
              <div className="flex items-center gap-1 bg-black/10 dark:bg-white/5 p-0.5 rounded-lg border-[0.5px] border-white/10">
                <button
                  type="button"
                  onClick={() => setVonotecTab("dual")}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    vonotecTab === "dual"
                      ? "bg-[#0052FF] dark:bg-[#38bdf8] text-white dark:text-black font-semibold shadow-sm"
                      : "text-muted hover:text-primary dark:hover:text-frost"
                  }`}
                >
                  Dual View
                </button>
                <button
                  type="button"
                  onClick={() => setVonotecTab("intake")}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    vonotecTab === "intake"
                      ? "bg-[#0052FF] dark:bg-[#38bdf8] text-white dark:text-black font-semibold shadow-sm"
                      : "text-muted hover:text-primary dark:hover:text-frost"
                  }`}
                >
                  Streamlit Intake
                </button>
                <button
                  type="button"
                  onClick={() => setVonotecTab("analytics")}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    vonotecTab === "analytics"
                      ? "bg-[#0052FF] dark:bg-[#38bdf8] text-white dark:text-black font-semibold shadow-sm"
                      : "text-muted hover:text-primary dark:hover:text-frost"
                  }`}
                >
                  Analytics BI
                </button>
                <button
                  type="button"
                  onClick={() => setVonotecTab("sharepoint")}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    vonotecTab === "sharepoint"
                      ? "bg-[#0052FF] dark:bg-[#38bdf8] text-white dark:text-black font-semibold shadow-sm"
                      : "text-muted hover:text-primary dark:hover:text-frost"
                  }`}
                >
                  SharePoint Sync
                </button>
              </div>
            </div>

            {/* Showcase Viewport */}
            {vonotecTab === "dual" && (
              <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow bg-white/40 dark:bg-black/20">
                {/* Asset 1: Streamlit Ingestion UI */}
                <button
                  type="button"
                  onClick={() => setVonotecTab("intake")}
                  className="group/item relative rounded-lg overflow-hidden border-[0.5px] border-white/10 dark:border-white/10 border-black/5 bg-white/95 dark:bg-[#0f1115]/90 flex flex-col flex-grow text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052FF]"
                >
                  <div className="relative flex-grow min-h-[220px] sm:min-h-[280px] w-full overflow-hidden">
                    <Image
                      src="/projects/vonotec-defect-extraction-ui.jpg"
                      alt="Streamlit Ingestion Web App Interface"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                      className="object-cover object-top transition-transform duration-300 group-hover/item:scale-105"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[9px] text-white font-mono border-[0.5px] border-white/20">
                      Streamlit Intake UI
                    </div>
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] text-[#38bdf8] font-mono border-[0.5px] border-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity">
                      Zoom &rarr;
                    </div>
                  </div>
                  <div className="p-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-t-[0.5px] border-white/10 flex items-center justify-between text-[10px]">
                    <span className="text-primary font-medium truncate">Batch Image Ingestion</span>
                    <span className="text-[#0052FF] dark:text-[#38bdf8] shrink-0 font-semibold">Gemini OCR</span>
                  </div>
                </button>

                {/* Asset 2: Facade Analytics Dashboard */}
                <button
                  type="button"
                  onClick={() => setVonotecTab("analytics")}
                  className="group/item relative rounded-lg overflow-hidden border-[0.5px] border-white/10 dark:border-white/10 border-black/5 bg-white/95 dark:bg-[#0f1115]/90 flex flex-col flex-grow text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052FF]"
                >
                  <div className="relative flex-grow min-h-[220px] sm:min-h-[280px] w-full overflow-hidden">
                    <Image
                      src="/projects/vonotec-analytics-dashboard.jpg"
                      alt="Facade Defect Analytics Dashboard Interface"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                      className="object-cover object-top transition-transform duration-300 group-hover/item:scale-105"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[9px] text-white font-mono border-[0.5px] border-white/20">
                      Analytics Dashboard
                    </div>
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] text-[#38bdf8] font-mono border-[0.5px] border-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity">
                      Zoom &rarr;
                    </div>
                  </div>
                  <div className="p-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-t-[0.5px] border-white/10 flex items-center justify-between text-[10px]">
                    <span className="text-primary font-medium truncate">Telemetry &amp; Quantities</span>
                    <span className="text-[#0052FF] dark:text-[#38bdf8] shrink-0 font-semibold">4,754 Defects</span>
                  </div>
                </button>
              </div>
            )}

            {vonotecTab === "intake" && (
              <div className="p-3 flex flex-col flex-grow bg-white/40 dark:bg-black/20">
                <div className="relative rounded-lg overflow-hidden border-[0.5px] border-white/10 dark:border-white/10 border-black/5 bg-white/95 dark:bg-[#0f1115]/90 flex flex-col flex-grow">
                  <div className="relative flex-grow min-h-[280px] sm:min-h-[360px] md:min-h-[420px] w-full overflow-hidden">
                    <Image
                      src="/projects/vonotec-defect-extraction-ui.jpg"
                      alt="Streamlit Ingestion Web App Interface"
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover object-top"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] text-white font-mono border-[0.5px] border-white/20">
                      Streamlit Intake Web App // Multimodal Whiteboard Ingestion
                    </div>
                  </div>
                  <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] border-t-[0.5px] border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                    <span className="text-slate-700 dark:text-slate-300">
                      Field whiteboard photo intake with auto-rectification &amp; structured JSON extraction
                    </span>
                    <span className="text-[#0052FF] dark:text-[#38bdf8] font-semibold shrink-0">
                      Gemini 1.5 Multimodal OCR
                    </span>
                  </div>
                </div>
              </div>
            )}

            {vonotecTab === "analytics" && (
              <div className="p-3 flex flex-col flex-grow bg-white/40 dark:bg-black/20">
                <div className="relative rounded-lg overflow-hidden border-[0.5px] border-white/10 dark:border-white/10 border-black/5 bg-white/95 dark:bg-[#0f1115]/90 flex flex-col flex-grow">
                  <div className="relative flex-grow min-h-[280px] sm:min-h-[360px] md:min-h-[420px] w-full overflow-hidden">
                    <Image
                      src="/projects/vonotec-analytics-dashboard.jpg"
                      alt="Facade Defect Analytics Dashboard Interface"
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover object-top"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] text-white font-mono border-[0.5px] border-white/20">
                      Facade Defect Analytics &amp; Repair Quantities BI Dashboard
                    </div>
                  </div>
                  <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] border-t-[0.5px] border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                    <span className="text-slate-700 dark:text-slate-300">
                      Live telemetry monitoring 4,754 defects, 5,102.50 LM linear repair volume, &amp; categories
                    </span>
                    <span className="text-[#0052FF] dark:text-[#38bdf8] font-semibold shrink-0">
                      Altair + Streamlit Analytics
                    </span>
                  </div>
                </div>
              </div>
            )}

            {vonotecTab === "sharepoint" && (
              <div className="p-3 flex flex-col flex-grow bg-white/40 dark:bg-black/20">
                <div className="relative rounded-lg overflow-hidden border-[0.5px] border-white/10 dark:border-white/10 border-black/5 bg-white/95 dark:bg-[#0f1115]/90 flex flex-col flex-grow">
                  <div className="relative flex-grow min-h-[280px] sm:min-h-[360px] md:min-h-[420px] w-full overflow-hidden">
                    <Image
                      src="/projects/vonotec-sharepoint-excel-log.jpg"
                      alt="Enterprise SharePoint Online Excel Master Database"
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover object-top"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] text-white font-mono border-[0.5px] border-white/20">
                      Enterprise SharePoint Online Excel Master Database
                    </div>
                  </div>
                  <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] border-t-[0.5px] border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                    <span className="text-slate-700 dark:text-slate-300">
                      Automated schema sync directly into enterprise SharePoint Online Excel master sheet
                    </span>
                    <span className="text-[#0052FF] dark:text-[#38bdf8] font-semibold shrink-0">
                      Office 365 Graph API
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* IsKiosk 3D CAD & Hardware Blueprint Hero Asset */}
        {project.slug === "iskiosk-terminal" && (
          <div className="mb-6 rounded-xl overflow-hidden bg-black/[0.04] dark:bg-base/80 border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] font-mono">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/[0.03] dark:bg-black/40 border-b-[0.5px] border-white/10 text-[10px] text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-widest font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] dark:bg-[#38bdf8] animate-pulse" />
                3D CAD Schematic &amp; Hardware Hero Asset
              </span>
              <span className="text-muted">REV 2.1 // 94CM CHASSIS</span>
            </div>

            {/* Hero 3D CAD Wireframe Image Preview */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/95 dark:bg-[#0f1115]/80">
              <Image
                src="/projects/iskiosk-cad-model.jpg"
                alt="IsKiosk 3D CAD Schematic and Chassis Wireframe"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] text-white font-mono border-[0.5px] border-white/20">
                15&quot; Touchscreen + Dual Solenoid Compartments
              </div>
            </div>

            {/* Pinout & Hardware Architecture Spec Grid */}
            <div className="p-3 grid grid-cols-2 gap-2 text-[11px] text-muted">
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
                <span className="text-primary font-medium">Core:</span>
                <span className="truncate">Dell Wyse 5070</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
                <span className="text-primary font-medium">MCU:</span>
                <span className="truncate">Arduino Uno R3</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
                <span className="text-primary font-medium">Relay:</span>
                <span className="truncate">Opto-isolated 2-Ch</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
                <span className="text-primary font-medium">Actuator:</span>
                <span className="truncate">12V Solenoid Drop</span>
              </div>
            </div>
          </div>
        )}

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
