"use client";

import React, { useState, useEffect } from "react";
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
  isTargeted?: boolean;
  isSingle?: boolean;
}

function SpotlightBentoCard({
  project,
  index,
  isTargeted = false,
  isSingle = false,
}: SpotlightBentoCardProps) {
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
  // When isSingle: maximize full space with col-span-12
  // When multi-grid: Card 0 (8-col), Card 1 (4-col), Card 2+ (12-col)
  const spanClass = isSingle
    ? "col-span-12"
    : index === 0
    ? "md:col-span-8"
    : index === 1
    ? "md:col-span-4"
    : "md:col-span-12";

  const isFeatured = index === 0 && !isSingle;
  const [vonotecTab, setVonotecTab] = useState<"dual" | "intake" | "analytics" | "sharepoint">("dual");

  // Reusable Project Media / Visual Asset Block
  const renderProjectAsset = () => (
    <>
      {/* Vonotec Automated Defect Logger Web App & Dashboard Showcase */}
      {(project.slug === "vonotec-defect-logger" || project.slug === "gemini-defect-logger") && (
        <div className="mb-6 rounded-xl overflow-hidden bg-black/[0.04] dark:bg-base/80 border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] font-mono flex flex-col">
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
                Intake UI
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
                Analytics
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
                SharePoint
              </button>
            </div>
          </div>

          {/* Tabbed Interactive Screenshots Frame */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
            {vonotecTab === "dual" && (
              <div className="grid grid-cols-2 w-full h-full divide-x divide-white/10">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/projects/vonotec-defect-extraction-ui.jpg"
                    alt="Streamlit Batch Intake UI"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] text-white font-mono border-[0.5px] border-white/20">
                    Intake &amp; OCR Engine
                  </div>
                </div>
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/projects/vonotec-analytics-dashboard.jpg"
                    alt="Facade Analytics Dashboard"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] text-white font-mono border-[0.5px] border-white/20">
                    4,754 Metric Telemetry
                  </div>
                </div>
              </div>
            )}
            {vonotecTab === "intake" && (
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/projects/vonotec-defect-extraction-ui.jpg"
                  alt="Streamlit Batch Intake UI"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain object-center transition-transform duration-300 hover:scale-105 p-1"
                />
              </div>
            )}
            {vonotecTab === "analytics" && (
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/projects/vonotec-analytics-dashboard.jpg"
                  alt="Facade Analytics Dashboard"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain object-center transition-transform duration-300 hover:scale-105 p-1"
                />
              </div>
            )}
            {vonotecTab === "sharepoint" && (
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/projects/vonotec-sharepoint-excel-log.jpg"
                  alt="Enterprise SharePoint Master"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain object-center transition-transform duration-300 hover:scale-105 p-1"
                />
              </div>
            )}
          </div>

          {/* Pipeline Architecture Spec Grid */}
          <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-muted border-t-[0.5px] border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Vision:</span>
              <span className="truncate">Gemini 1.5</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Schema:</span>
              <span className="truncate">Pydantic v2</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Sync:</span>
              <span className="truncate">SharePoint</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Engine:</span>
              <span className="truncate">Streamlit</span>
            </div>
          </div>
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
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] text-white font-mono border-[0.5px] border-white/20">
              15&quot; Touchscreen + Dual Solenoid Compartments
            </div>
          </div>

          {/* Pinout & Hardware Architecture Spec Rows */}
          <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-muted border-t-[0.5px] border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Compute:</span>
              <span className="font-mono text-[10px] text-slate-800 dark:text-slate-200">Dell 5070</span>
            </div>
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Controller:</span>
              <span className="font-mono text-[10px] text-slate-800 dark:text-slate-200">Uno R3</span>
            </div>
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Relay:</span>
              <span className="font-mono text-[10px] text-slate-800 dark:text-slate-200">Opto-2Ch</span>
            </div>
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Actuator:</span>
              <span className="font-mono text-[10px] text-slate-800 dark:text-slate-200">12V Solenoid</span>
            </div>
          </div>
        </div>
      )}

      {/* Komunikonek Mobile Reactive Architecture Preview Asset */}
      {project.slug === "komunikonek" && (
        <div className="mb-6 rounded-xl overflow-hidden bg-black/[0.04] dark:bg-base/80 border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] font-mono flex flex-col">
          {/* Header Telemetry */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/[0.03] dark:bg-black/40 border-b-[0.5px] border-white/10 text-[10px] text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-widest font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] dark:bg-[#38bdf8] animate-pulse" />
              Mobile Client &amp; Offline Sync Topology
            </span>
            <span className="text-muted">DART 3.x // FLUTTER ENGINE</span>
          </div>

          {/* Architecture Visualizer */}
          <div className="p-4 bg-white/95 dark:bg-[#0f1115]/80 flex flex-col gap-3 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 flex flex-col justify-between">
                <span className="text-muted text-[10px] uppercase">1. Citizen Client</span>
                <span className="text-primary font-bold mt-1">Flutter UI Reactive</span>
                <span className="text-emerald-500 text-[10px] mt-2 font-mono">● Sub-200ms Render</span>
              </div>
              <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 flex flex-col justify-between">
                <span className="text-muted text-[10px] uppercase">2. Offline Resilience</span>
                <span className="text-primary font-bold mt-1">SQLite Caching Queue</span>
                <span className="text-[#0052FF] dark:text-[#38bdf8] text-[10px] mt-2 font-mono">Zero-Drop Buffer</span>
              </div>
              <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 flex flex-col justify-between">
                <span className="text-muted text-[10px] uppercase">3. Cloud Ingestion</span>
                <span className="text-primary font-bold mt-1">Firestore &amp; RBAC</span>
                <span className="text-purple-400 text-[10px] mt-2 font-mono">Declarative Rules</span>
              </div>
            </div>
          </div>

          {/* Specs Row */}
          <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-muted border-t-[0.5px] border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Framework:</span>
              <span className="truncate">Flutter 3.x</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Local Cache:</span>
              <span className="truncate">SQLite WAL</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Security:</span>
              <span className="truncate">Firebase RBAC</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
              <span className="text-primary font-medium">Sync SLA:</span>
              <span className="truncate">&lt; 200ms</span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <motion.div
      data-testid={`bento-card-${index}`}
      onMouseMove={handleMouseMove}
      style={{ rotateX: tiltX, rotateY: tiltY }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-electricBlue/50 dark:hover:border-electricBlue/50 hover:shadow-[0_0_20px_rgba(0,82,255,0.15)] dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 flex flex-col col-span-12 ${spanClass} ${
        isTargeted
          ? "ring-2 ring-[#0052FF] dark:ring-[#38bdf8] shadow-[0_0_25px_rgba(0,82,255,0.35)] scale-[1.01]"
          : ""
      }`}
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

      {/* Card Content: Expansive 2-column layout when isSingle, else standard bento stack */}
      {isSingle ? (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column (Metadata, Metrics & CTAs) */}
          <div className="lg:col-span-5 flex flex-col justify-between w-full h-full">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-primary dark:text-frost">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0052FF] dark:text-[#38bdf8] bg-[#0052FF]/10 dark:bg-[#38bdf8]/10 px-2.5 py-0.5 rounded-full border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 font-medium">
                  Deep Dive
                </span>
              </div>

              <p className="text-[#0052FF] dark:text-[#38bdf8] text-[11px] font-mono font-medium tracking-widest uppercase mb-4">
                {project.role}
              </p>

              <p className="font-sans text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                {project.overview}
              </p>

              {/* Quantified Metrics Highlight Bar */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-4 rounded-xl bg-black/[0.03] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                {project.metrics.map((m, mi) => (
                  <div key={mi} className="text-center sm:text-left">
                    <span className="block text-sm sm:text-base font-semibold text-[#0052FF] dark:text-[#38bdf8] tracking-tight font-mono tabular-nums">
                      {m.value}
                    </span>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-muted font-medium leading-tight mt-0.5">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] uppercase tracking-wider font-medium text-primary bg-black/[0.04] dark:bg-surface/60 px-2.5 py-1 rounded-full border-[0.5px] border-white/10 dark:border-white/10 border-black/5 group-hover:border-electricBlue/50 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0052FF] hover:bg-[#0041cc] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-[0_0_15px_rgba(0,82,255,0.25)]"
              >
                <span>View Full Architecture &amp; Case Study</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column (Showcase Media / Hardware Preview) */}
          <div className="lg:col-span-7 w-full flex flex-col justify-center">
            {renderProjectAsset()}
          </div>
        </div>
      ) : (
        /* Multi-Card Bento Flow */
        <div className="relative z-10 flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-sans text-xl sm:text-2xl font-medium tracking-tight text-primary dark:text-frost">
              {project.title}
            </h3>
            {isFeatured && (
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0052FF] dark:text-[#38bdf8] bg-[#0052FF]/10 dark:bg-[#38bdf8]/10 px-3 py-1 rounded-full border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 self-start sm:self-auto font-medium">
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

          {renderProjectAsset()}

          {/* Quantified Metrics Highlight Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-4 rounded-xl bg-black/[0.03] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            {project.metrics.map((m, mi) => (
              <div key={mi} className="text-center sm:text-left">
                <span className="block text-sm sm:text-base font-semibold text-[#0052FF] dark:text-[#38bdf8] tracking-tight font-mono tabular-nums">
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
      )}
    </motion.div>
  );
}

export type ProjectCategory =
  | "all"
  | "ai-vision"
  | "cyber-physical"
  | "mobile"
  | "distributed"
  | "enterprise";

interface FilterTab {
  id: ProjectCategory;
  label: string;
  count?: number;
}

const FILTER_TABS: FilterTab[] = [
  { id: "all", label: "All Architectures", count: 3 },
  { id: "ai-vision", label: "AI Vision & Pipelines", count: 1 },
  { id: "cyber-physical", label: "Cyber-Physical & IoT", count: 1 },
  { id: "mobile", label: "Mobile & Offline Sync", count: 1 },
  { id: "distributed", label: "Distributed Mesh & MySQL", count: 1 },
];

function DistributedMeshVisualizer() {
  const [syncedCount, setSyncedCount] = useState(1420);
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastOrigin, setLastOrigin] = useState<"MNL" | "SGP">("MNL");

  const handleSimulateWrite = (origin: "MNL" | "SGP") => {
    setIsSimulating(true);
    setLastOrigin(origin);
    setTimeout(() => {
      setSyncedCount((c) => c + 1);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-black/[0.04] dark:bg-base/80 border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] font-mono flex flex-col">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-black/[0.03] dark:bg-black/40 border-b-[0.5px] border-white/10 text-[10px] gap-2">
        <span className="flex items-center gap-1.5 text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-widest font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] dark:bg-[#38bdf8] animate-pulse" />
          WireGuard Mesh GTID Topology
        </span>
        <span className="text-[10px] text-muted font-mono">
          Overlay: <span className="text-emerald-500 font-semibold">Encrypted (ChaCha20)</span>
        </span>
      </div>

      {/* Visualizer Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {/* Topology Mesh Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
          {/* Node 1: Manila */}
          <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-primary dark:text-frost mb-1">
                <span>Node 1: MNL-DC01</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[10px] text-muted font-mono mb-2">100.64.0.1 • Primary Master</p>
              <div className="space-y-1 text-[10px] font-mono text-muted">
                <div className="flex justify-between">
                  <span>auto_inc_offset:</span>
                  <span className="text-[#0052FF] dark:text-[#38bdf8] font-semibold">1 (Odd Keys)</span>
                </div>
                <div className="flex justify-between">
                  <span>GTID Executed:</span>
                  <span className="tabular-nums text-primary font-medium">3a9f:{syncedCount}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSimulateWrite("MNL")}
              disabled={isSimulating}
              className="mt-3 w-full py-1.5 px-2 rounded bg-[#0052FF]/10 dark:bg-[#38bdf8]/10 hover:bg-[#0052FF]/20 text-[#0052FF] dark:text-[#38bdf8] text-[10px] font-mono font-semibold transition-colors cursor-pointer border border-[#0052FF]/20 text-center"
            >
              {isSimulating && lastOrigin === "MNL" ? "Replicating..." : "Simulate Write (Odd ID)"}
            </button>
          </div>

          {/* Node 2: Singapore */}
          <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-primary dark:text-frost mb-1">
                <span>Node 2: SGP-DC02</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[10px] text-muted font-mono mb-2">100.64.0.2 • Primary Master</p>
              <div className="space-y-1 text-[10px] font-mono text-muted">
                <div className="flex justify-between">
                  <span>auto_inc_offset:</span>
                  <span className="text-[#0052FF] dark:text-[#38bdf8] font-semibold">2 (Even Keys)</span>
                </div>
                <div className="flex justify-between">
                  <span>GTID Executed:</span>
                  <span className="tabular-nums text-primary font-medium">3a9f:{syncedCount}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSimulateWrite("SGP")}
              disabled={isSimulating}
              className="mt-3 w-full py-1.5 px-2 rounded bg-[#0052FF]/10 dark:bg-[#38bdf8]/10 hover:bg-[#0052FF]/20 text-[#0052FF] dark:text-[#38bdf8] text-[10px] font-mono font-semibold transition-colors cursor-pointer border border-[#0052FF]/20 text-center"
            >
              {isSimulating && lastOrigin === "SGP" ? "Replicating..." : "Simulate Write (Even ID)"}
            </button>
          </div>
        </div>

        {/* Live Tunnel Telemetry */}
        <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.02] border-[0.5px] border-white/10 text-[10px] font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isSimulating ? "bg-amber-400 animate-ping" : "bg-emerald-500"}`} />
            <span className="text-muted">Replication Stream:</span>
            <span className="text-primary font-medium">{isSimulating ? `Syncing ${lastOrigin} -> Peer` : "Active / In-Sync"}</span>
          </div>
          <span className="text-emerald-500 font-semibold tabular-nums">0 Conflict Errors</span>
        </div>
      </div>

      {/* Visualizer Specs Footer */}
      <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-muted border-t-[0.5px] border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
          <span className="text-primary font-medium">Overlay:</span>
          <span className="truncate">Tailscale Mesh</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
          <span className="text-primary font-medium">Protocol:</span>
          <span className="truncate">MySQL GTID</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
          <span className="text-primary font-medium">Public Ports:</span>
          <span className="truncate">0 (Zero Trust)</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.03] border-[0.5px] border-white/5">
          <span className="text-primary font-medium">Split-Brain:</span>
          <span className="truncate">0% Collision</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [targetedSlug, setTargetedSlug] = useState<string | null>(null);

  useEffect(() => {
    const handleFilter = (e: Event) => {
      const detail = (e as CustomEvent<{ category?: ProjectCategory; slug?: string }>).detail;
      if (detail?.category) {
        setActiveCategory(detail.category);
      }
      if (detail?.slug) {
        setTargetedSlug(detail.slug);
        const timer = setTimeout(() => {
          setTargetedSlug((prev) => (prev === detail.slug ? null : prev));
        }, 3500);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener("filter-projects", handleFilter);
    return () => {
      window.removeEventListener("filter-projects", handleFilter);
    };
  }, []);

  const filteredProjects = caseStudies.filter((project) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ai-vision")
      return project.slug === "vonotec-defect-logger" || project.slug === "gemini-defect-logger";
    if (activeCategory === "cyber-physical") return project.slug === "iskiosk-terminal";
    if (activeCategory === "mobile") return project.slug === "komunikonek";
    if (activeCategory === "enterprise")
      return project.slug === "vonotec-defect-logger" || project.slug === "iskiosk-terminal";
    return false;
  });

  return (
    <section id="projects" className="py-24 lg:py-32 px-4 sm:px-6 overflow-x-clip">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col gap-4">
          <div className="text-left">
            <p className="text-[#0052FF] dark:text-[#38bdf8] font-mono font-medium tracking-widest uppercase mb-1 text-[11px]">
              Selected Works
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-medium text-primary dark:text-frost tracking-tight">
              Spotlight <span className="text-[#0052FF] dark:text-[#38bdf8]">Bento Grid</span>
            </h2>
          </div>

          {/* Interactive Category Filter Pills (Guaranteed Single Horizontal Line) */}
          <div className="overflow-x-auto max-w-full pb-1 scrollbar-none">
            <div
              role="tablist"
              aria-label="Filter projects by engineering domain"
              className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-[#1e2128]/40 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 whitespace-nowrap flex-nowrap shrink-0"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategory(tab.id);
                      setTargetedSlug(null);
                    }}
                    className={`relative px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none shrink-0 ${
                      isActive
                        ? "bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.3)] font-semibold"
                        : "text-muted hover:text-primary dark:hover:text-frost hover:bg-white/5"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono tabular-nums ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-black/10 dark:bg-white/10 text-muted"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Filter Status & Reset Pill */}
        {activeCategory !== "all" && (
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-muted bg-[#0052FF]/5 dark:bg-[#38bdf8]/5 border border-[#0052FF]/20 px-4 py-2 rounded-xl">
            <span>
              Filtering by:{" "}
              <strong className="text-[#0052FF] dark:text-[#38bdf8]">
                {FILTER_TABS.find((t) => t.id === activeCategory)?.label}
              </strong>
            </span>
            <button
              onClick={() => setActiveCategory("all")}
              className="text-[#0052FF] dark:text-[#38bdf8] hover:underline cursor-pointer font-semibold"
            >
              Reset to All Works &times;
            </button>
          </div>
        )}

        <div
          data-testid="bento-grid"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {activeCategory === "distributed" ? (
            /* Dedicated Distributed Infrastructure Showcase Card */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="col-span-12 rounded-2xl p-6 sm:p-8 bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                {/* Left 5 Columns: Metadata, Metrics, Stack & CTA */}
                <div className="lg:col-span-5 flex flex-col justify-between w-full h-full">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-primary dark:text-frost">
                        Distributed Master-Master MySQL GTID Replication
                      </h3>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#0052FF] dark:text-[#38bdf8] bg-[#0052FF]/10 dark:bg-[#38bdf8]/10 px-2.5 py-0.5 rounded-full border-[0.5px] border-[#0052FF]/30 dark:border-[#38bdf8]/30 font-medium">
                        Zero-Trust Mesh
                      </span>
                    </div>

                    <p className="text-[#0052FF] dark:text-[#38bdf8] text-[11px] font-mono font-medium tracking-widest uppercase mb-4">
                      Systems &amp; Database Architect
                    </p>

                    <p className="font-sans text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                      Architected circular multi-master GTID replication across geographically distributed Linux hosts over an encrypted Tailscale WireGuard mesh with zero public port exposure. Utilizes deterministic auto-increment partitioning (odd/even key sets) to guarantee zero split-brain collisions during simultaneous writes.
                    </p>

                    {/* Empirical Distributed Metrics */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-4 rounded-xl bg-black/[0.03] dark:bg-base/60 border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                      <div className="text-center sm:text-left">
                        <span className="block text-sm sm:text-base font-semibold text-[#0052FF] dark:text-[#38bdf8] tracking-tight font-mono tabular-nums">
                          0ms
                        </span>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-muted font-medium leading-tight mt-0.5">
                          Split-Brain Failover
                        </span>
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="block text-sm sm:text-base font-semibold text-[#0052FF] dark:text-[#38bdf8] tracking-tight font-mono tabular-nums">
                          100%
                        </span>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-muted font-medium leading-tight mt-0.5">
                          Encrypted Overlay
                        </span>
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="block text-sm sm:text-base font-semibold text-[#0052FF] dark:text-[#38bdf8] tracking-tight font-mono tabular-nums">
                          4 Nodes
                        </span>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-muted font-medium leading-tight mt-0.5">
                          Circular Topology
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Tailscale WireGuard", "MySQL 8.0 GTID", "Docker Compose", "Ubuntu Linux", "Zero-Trust ACLs"].map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] uppercase tracking-wider font-medium text-primary bg-black/[0.04] dark:bg-surface/60 px-2.5 py-1 rounded-full border-[0.5px] border-white/10 dark:border-white/10 border-black/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/blog/master-master-mysql-replication-over-tailscale"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0052FF] hover:bg-[#0041cc] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-[0_0_15px_rgba(0,82,255,0.25)]"
                    >
                      <span>Launch Interactive Simulator &amp; Read Architecture</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Right 7 Columns: Interactive WireGuard Mesh & MySQL GTID Replication Visualizer */}
                <div className="lg:col-span-7 w-full flex flex-col justify-center">
                  <DistributedMeshVisualizer />
                </div>
              </div>
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => (
              <SpotlightBentoCard
                key={project.slug}
                project={project}
                index={index}
                isTargeted={targetedSlug === project.slug}
                isSingle={filteredProjects.length === 1}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
