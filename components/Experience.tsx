"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: "Work" | "Internship" | "Education";
  highlights: string[];
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstDotRef = useRef<HTMLDivElement | null>(null);
  const lastDotRef = useRef<HTMLDivElement | null>(null);

  // Dynamic rail geometry to mathematically connect first node to last node with zero gaps or overhang
  const [railStyle, setRailStyle] = useState<{ top: number; height: number }>({
    top: 14,
    height: 733,
  });

  useEffect(() => {
    const updateRail = () => {
      if (!containerRef.current || !firstDotRef.current || !lastDotRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const firstRect = firstDotRef.current.getBoundingClientRect();
      const lastRect = lastDotRef.current.getBoundingClientRect();

      const top = firstRect.top + firstRect.height / 2 - cRect.top;
      const bottom = lastRect.top + lastRect.height / 2 - cRect.top;
      const height = Math.max(0, bottom - top);

      setRailStyle({ top, height });
    };

    updateRail();
    window.addEventListener("resize", updateRail);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      observer = new ResizeObserver(updateRail);
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateRail);
      observer?.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 32,
    restDelta: 0.001,
  });

  // Clamp strictly between 0 and 1 so line never reverses or overshoots
  const clampedScaleY = useTransform(smoothProgress, (val) => Math.max(0, Math.min(1, val)));

  // Calculate top coordinate percentage for the traveling tracer head
  const tracerTop = useTransform(smoothProgress, (val) => `${Math.max(0, Math.min(100, val * 100))}%`);

  const timeline: TimelineItem[] = [
    {
      period: "2024 – Present",
      role: "Digital Data & Systems Engineer | AI/IoT Data Officer",
      organization: "Vonotec",
      location: "Philippines",
      type: "Work",
      highlights: [
        "Architected zero-trust Microsoft Entra ID and Intune endpoint management policies for distributed automated kiosks and corporate devices.",
        "Engineered active-active multi-node MySQL GTID replication clusters interconnected securely across Linux hosts via Tailscale WireGuard mesh.",
        "Built automated field defect extraction pipelines using Python, Streamlit, and Google Gemini API, streaming structured inspection telemetry into SharePoint Online workbooks.",
        "Streamlined Odoo ERP workflow hierarchies to reduce multi-tier purchase and inventory approval bottlenecks.",
      ],
    },
    {
      period: "Internship",
      role: "IT Systems & Network Intern",
      organization: "PHINMA Property Holdings Corporation",
      location: "Metro Manila, Philippines",
      type: "Internship",
      highlights: [
        "Gained foundational, hands-on experience in enterprise cloud infrastructure, focusing on Microsoft Intune device enrollment and Microsoft Entra ID (Azure AD) identity governance.",
        "Assisted in configuring conditional access policies, user directory synchronization, and endpoint compliance profiles.",
        "Provided frontline IT systems administration and technical support across corporate hardware and network environments.",
      ],
    },
    {
      period: "Alumnus",
      role: "BS in Computer Engineering (Major in Big Data Analytics)",
      organization: "Polytechnic University of the Philippines (PUP)",
      location: "Sta. Mesa, Manila",
      type: "Education",
      highlights: [
        "Graduated with specialization in Big Data Analytics, bridging distributed data processing with low-level physical hardware co-design.",
        "QA Tester and Systems Evaluator for the IsKiosk: Document Management System, conducting ISO/IEC 25010 software quality audits and time-motion studies.",
        "Rigorous foundation in microcontroller firmware (C/C++), discrete systems, data structures, and computer networking.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10 text-left">
          <p className="text-[#0052FF] dark:text-[#38bdf8] font-mono font-medium tracking-widest uppercase mb-2 text-[11px]">
            Career Timeline
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-primary dark:text-frost mb-2">
            Experience &amp; <span className="text-[#0052FF] dark:text-[#38bdf8]">Education</span>
          </h2>
          <p className="font-sans text-slate-700 dark:text-slate-200 font-normal text-sm md:text-base mt-2 max-w-xl leading-relaxed">
            From Big Data Analytics at PUP and enterprise cloud training at PHINMA to full-stack systems and AI/IoT engineering at Vonotec.
          </p>
        </div>

        <div ref={containerRef} className="relative ml-4 md:ml-8">
          {/* Dedicated Rail System (Track, Fill, Tracer) isolated from space-y-12 */}
          <div
            aria-hidden="true"
            style={{
              top: `${railStyle.top}px`,
              height: `${railStyle.height}px`,
            }}
            className="absolute left-0 w-[2.5px] -translate-x-1/2 pointer-events-none z-10"
          >
            {/* 1. Static Rail Track (runs exactly from dot 0 center to dot 2 center) */}
            <div className="absolute inset-0 w-[1.5px] mx-auto bg-black/10 dark:bg-white/10 rounded-full" />

            {/* 2. Dynamic Electric Blue Animated Progress Fill */}
            <motion.div
              style={{ scaleY: clampedScaleY, transformOrigin: "top" }}
              className="absolute inset-0 w-full bg-gradient-to-b from-[#0052FF] via-[#38bdf8] to-[#0052FF] shadow-[0_0_12px_rgba(0,82,255,0.8),0_0_20px_rgba(56,189,248,0.5)] origin-top rounded-full"
            />

            {/* 3. Glowing Tracer Head that docks right onto the milestone nodes */}
            <motion.div
              style={{ top: tracerTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white ring-4 ring-[#0052FF] dark:ring-[#38bdf8] shadow-[0_0_14px_#38bdf8,0_0_24px_rgba(0,82,255,0.8)] z-30"
            />
          </div>

          {/* Cards container with isolated space-y-8 md:space-y-10 */}
          <div className="space-y-8 md:space-y-10">
            {timeline.map((item, index) => (
              <div key={index} className="relative group pl-8 md:pl-12">
                {/* Timeline Milestone Marker (Glowing blue pulse node) */}
                <div
                  ref={index === 0 ? firstDotRef : index === timeline.length - 1 ? lastDotRef : undefined}
                  className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-base bg-[#0052FF] dark:bg-[#38bdf8] ring-4 ring-[#0052FF]/20 dark:ring-[#38bdf8]/30 shadow-[0_0_10px_rgba(0,82,255,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_16px_#38bdf8] transition-all duration-300 z-20"
                />

                <div className="bg-[#1e2128]/60 dark:bg-[#1e2128]/60 bg-white/70 backdrop-blur-xl border-[0.5px] border-white/10 dark:border-white/10 border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] p-6 md:p-8 rounded-2xl hover:border-electricBlue/50 dark:hover:border-electricBlue/50 hover:shadow-[0_0_15px_rgba(0,82,255,0.12)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-medium text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-widest">
                      {item.period}
                    </span>
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border-[0.5px] self-start sm:self-auto ${
                        item.type === "Work"
                          ? "bg-[#0052FF]/10 dark:bg-[#38bdf8]/10 border-[#0052FF]/30 dark:border-[#38bdf8]/30 text-[#0052FF] dark:text-[#38bdf8] font-medium"
                          : item.type === "Internship"
                          ? "bg-cyan-500/10 dark:bg-[#38bdf8]/10 border-cyan-500/30 dark:border-[#38bdf8]/30 text-cyan-700 dark:text-[#38bdf8] font-medium"
                          : "bg-surface/60 border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200 font-medium"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl md:text-2xl font-medium tracking-tight text-primary dark:text-frost mb-1">
                    {item.role}
                  </h3>

                  <p className="font-sans text-slate-600 dark:text-slate-300 text-sm font-medium mb-4">
                    <strong className="text-primary">{item.organization}</strong>{" "}
                    • {item.location}
                  </p>

                  <ul className="space-y-2.5">
                    {item.highlights.map((point, i) => (
                      <li
                        key={i}
                        className="font-sans text-slate-700 dark:text-slate-200 text-sm leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] dark:bg-[#38bdf8] shrink-0 mt-2" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
