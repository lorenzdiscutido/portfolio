import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/caseStudyData";
import { SITE_URL } from "@/lib/site";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import HardwareSchematic from "@/components/HardwareSchematic";

export function generateStaticParams() {
  const slugs = caseStudies
    .map((study) => study.slug)
    .filter((slug) => slug !== "komunikonek");
  if (!slugs.includes("gemini-defect-logger")) {
    slugs.push("gemini-defect-logger");
  }
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug === "gemini-defect-logger" ? "vonotec-defect-logger" : slug;
  const study = caseStudies.find(
    (item) => item.slug === normalizedSlug || item.slug === slug
  );

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} | Case Study`,
    description: study.problem,
    alternates: {
      canonical: `${SITE_URL}/projects/${study.slug}`,
    },
    openGraph: {
      title: `${study.title} | Jose Lorenzo Discutido`,
      description: study.overview,
      url: `${SITE_URL}/projects/${study.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const normalizedSlug = slug === "gemini-defect-logger" ? "vonotec-defect-logger" : slug;
  const study = caseStudies.find(
    (item) => item.slug === normalizedSlug || item.slug === slug
  );

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Navigation */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold font-mono text-[#94a3b8] hover:text-[#0052FF] transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
        </Link>

        {/* Header Section */}
        <header className="mb-12">
          {study.logoUrl && (
            <div className="mb-6 max-w-[280px] p-3 rounded-xl bg-white/95 border border-white/10 shadow-sm">
              <Image
                src={study.logoUrl}
                alt={`${study.title} Brand Logo`}
                width={280}
                height={140}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f8fafc] tracking-tight mb-4">
            {study.title}
          </h1>
          <p className="text-[#0052FF] font-mono text-sm sm:text-base font-bold tracking-wider uppercase mb-6">
            {study.role}
          </p>

          {/* Tech Stack Tags in font-mono */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#94a3b8] mr-2">
              Tech Stack:
            </span>
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#1e2128] border border-white/5 text-[#f8fafc]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Optional External Links (GitHub / Live Deployment) */}
          {(study.githubUrl || study.liveUrl) && (
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e2128] border border-white/5 hover:border-[#0052FF]/50 text-[#f8fafc] font-mono text-xs font-semibold transition-all shadow-none"
                >
                  Source Repository →
                </a>
              )}
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0052FF] text-[#f8fafc] font-mono text-xs font-bold hover:bg-[#0052FF]/90 transition-all shadow-none hover:scale-[1.02] active:scale-[0.98]"
                >
                  Live System Demo →
                </a>
              )}
            </div>
          )}
        </header>

        {/* Academic Attribution & Committee Panel */}
        {study.academic && (
          <div className="mb-12 p-6 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none text-xs font-mono space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 flex-wrap gap-2">
              <span className="font-bold uppercase tracking-wider text-[#0052FF]">
                Academic Research Attribution &amp; Defense
              </span>
              <span className="text-[#94a3b8] font-medium">Evaluated: {study.academic.defenseDate}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div>
                <p className="text-[#94a3b8] font-bold uppercase mb-1">Project Authors / Engineering Team:</p>
                <p className="text-[#f8fafc] font-semibold leading-relaxed">
                  {study.academic.authors.join(", ")}
                </p>
                <p className="text-[#94a3b8] mt-2 font-medium">
                  {study.academic.institution}
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[#94a3b8] font-bold uppercase mb-0.5">Advisers:</p>
                  <p className="text-[#f8fafc] font-semibold">
                    {study.academic.advisers.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-[#94a3b8] font-bold uppercase mb-0.5">Evaluation Panel:</p>
                  <p className="text-[#0052FF] font-semibold">
                    {study.academic.panel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quantified Metrics Highlight Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {study.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0052FF] font-mono block tracking-tight mb-1">
                  {metric.value}
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f8fafc] block mb-2">
                  {metric.label}
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed pt-2 border-t border-white/5">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* System Demonstration Video Walkthrough */}
        {study.demoVideoEmbedUrl && (
          <section className="p-8 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc] font-mono uppercase tracking-wide">
                  Live System Demonstration &amp; Walkthrough
                </h2>
              </div>
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0052FF] text-[#f8fafc] font-mono text-xs font-bold hover:bg-[#0052FF]/90 transition-all self-start sm:self-auto shadow-none"
                >
                  Open in Google Drive ↗
                </a>
              )}
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/90 shadow-none">
              <iframe
                src={study.demoVideoEmbedUrl}
                title={`${study.title} Video Demonstration`}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* System Screenshots & Engineering Artifacts Gallery */}
        {study.screenshots && study.screenshots.length > 0 && (
          <section className="p-8 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none mb-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc] font-mono uppercase tracking-wide">
                System Captures &amp; Engineering Artifacts
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {study.screenshots.map((shot, idx) => {
                const isWide = shot.aspect === "wide";
                const isTall = shot.aspect === "tall";
                return (
                  <figure
                    key={idx}
                    className={`rounded-xl overflow-hidden border border-white/5 bg-[#0f1115] flex flex-col ${
                      isWide ? "md:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative w-full overflow-hidden ${
                        isWide
                          ? "aspect-[2.4/1] bg-white/95"
                          : isTall
                          ? "aspect-[3/4] bg-black/40"
                          : "aspect-[16/10] bg-white/95"
                      }`}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.caption}
                        fill
                        sizes={isWide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                        className={`transition-transform duration-500 hover:scale-105 ${
                          isWide
                            ? "object-contain p-4"
                            : isTall
                            ? "object-cover object-top"
                            : "object-contain p-6"
                        }`}
                      />
                    </div>
                    <figcaption className="p-3.5 text-xs font-mono text-[#94a3b8] border-t border-white/5 bg-[#1e2128]/40 leading-relaxed">
                      {shot.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* The Problem Section */}
        <section className="p-8 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc] font-mono uppercase tracking-wide">
              The Problem
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            {study.problem}
          </p>
        </section>

        {/* The Architecture & Solution Section */}
        <section className="p-8 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc] font-mono uppercase tracking-wide">
              The Architecture &amp; Solution
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed mb-8">
            {study.architecture}
          </p>

          {/* Interactive Architecture & Signal Stream */}
          <div className="my-8">
            <ArchitectureDiagram slug={study.slug} />
          </div>

          {/* Physical Hardware Schematics for IsKiosk */}
          {study.slug === "iskiosk-terminal" && (
            <div className="my-8">
              <HardwareSchematic />
            </div>
          )}

          {/* System Integration Details */}
          <div className="pt-6 border-t border-white/5">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#f8fafc] font-bold mb-3">
              System Integration Details
            </h3>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              {study.architectureDetails}
            </p>
          </div>
        </section>

        {/* The Outcome Section */}
        <section className="p-8 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc] font-mono uppercase tracking-wide">
              The Outcome
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed mb-6">
            {study.outcome}
          </p>

          <div className="pt-6 border-t border-white/5">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#f8fafc] font-bold mb-4">
              Engineering Deliverables &amp; Verified Results
            </h3>
            <ul className="space-y-3">
              {study.outcomes.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#94a3b8] text-sm leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0052FF] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ISO/IEC 25010 Quality Benchmark Table */}
        {study.isoEvaluation && (
          <section className="p-8 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none mb-10">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc] font-mono uppercase tracking-wide">
                  ISO/IEC 25010 Empirical Quality Evaluation
                </h2>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/30">
                Overall Weighted Mean: 3.70 / 4.00 (Highly Acceptable)
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] mb-6 leading-relaxed">
              Empirical quality evaluation conducted across student and administrative staff respondent cohorts utilizing a 4-point Likert compliance instrument across five core ISO/IEC 25010 software quality characteristics:
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0f1115] text-[#94a3b8] border-b border-white/5">
                  <tr>
                    <th className="py-2.5 px-3">Quality Characteristic</th>
                    <th className="py-2.5 px-3">Weighted Mean Score</th>
                    <th className="py-2.5 px-3">Descriptive Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0f1115]/40">
                  {study.isoEvaluation.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#0052FF]/5 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#f8fafc]">{row.characteristic}</td>
                      <td className="py-2.5 px-3 font-bold text-[#0052FF]">{row.score}</td>
                      <td className="py-2.5 px-3 font-medium text-[#f8fafc]">{row.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Economic Feasibility & ROI Analysis */}
        {study.financials && (
          <section className="p-8 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc] font-mono uppercase tracking-wide">
                Financial &amp; Economic Feasibility Analysis
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-[#0f1115]/60 border border-white/5">
                <span className="block text-xs font-mono text-[#94a3b8] uppercase">Total CapEx Cost</span>
                <span className="block text-xl font-mono font-bold text-[#f8fafc] mt-1">{study.financials.totalCost}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0f1115]/60 border border-white/5">
                <span className="block text-xs font-mono text-[#94a3b8] uppercase">Annualized Net Savings</span>
                <span className="block text-xl font-mono font-bold text-[#0052FF] mt-1">{study.financials.annualSavings}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0f1115]/60 border border-white/5">
                <span className="block text-xs font-mono text-[#94a3b8] uppercase">Projected ROI</span>
                <span className="block text-xl font-mono font-bold text-[#FF7A00] mt-1">{study.financials.roi}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0f1115]/60 border border-white/5">
                <span className="block text-xs font-mono text-[#94a3b8] uppercase">Payback Period</span>
                <span className="block text-xl font-mono font-bold text-[#FF7A00] mt-1">{study.financials.paybackPeriod}</span>
              </div>
            </div>
            <p className="text-xs text-[#94a3b8] font-mono">
              Empirical cost modeling projects total capital cost recovery within 4.63 months through administrative labor redeployment and physical paper reduction.
            </p>
          </section>
        )}

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-white/5 flex justify-between items-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-[#94a3b8] hover:text-[#0052FF] transition-colors"
          >
            ← Back to Portfolio
          </Link>
          <span className="text-xs font-mono text-[#94a3b8]">
            Node: {study.slug}
          </span>
        </div>
      </div>
    </div>
  );
}
