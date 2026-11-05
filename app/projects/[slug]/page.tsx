import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/caseStudyData";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import HardwareSchematic from "@/components/HardwareSchematic";

export function generateStaticParams() {
  const slugs = caseStudies.map((study) => study.slug);
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
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-orange-700 dark:text-orange font-semibold tracking-wide uppercase mb-2 font-mono text-sm">
            Error 404
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Case Study Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            The requested engineering case study could not be located in the system index.
          </p>
          <Link
            href="/#projects"
            className="inline-block px-6 py-3 rounded-lg bg-white dark:bg-[#1e2128] border border-black/10 dark:border-white/10 hover:border-orange text-slate-900 dark:text-white font-medium transition-colors font-mono text-sm"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Navigation */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold font-mono text-slate-600 dark:text-slate-400 hover:text-blue dark:hover:text-blue transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
        </Link>

        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {study.title}
          </h1>
          <p className="text-orange-700 dark:text-orange font-mono text-sm sm:text-base font-bold tracking-wider uppercase mb-6">
            {study.role}
          </p>

          {/* Tech Stack Tags in font-mono */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
              Tech Stack:
            </span>
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-semibold px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Quantified Metrics Highlight Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {study.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-blue dark:text-blue font-mono block tracking-tight mb-1">
                  {metric.value}
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block mb-2">
                  {metric.label}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-black/10 dark:border-white/10">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* The Problem Section */}
        <section className="p-8 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-orange" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wide">
              The Problem
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {study.problem}
          </p>
        </section>

        {/* The Architecture & Solution Section */}
        <section className="p-8 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-blue" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wide">
              The Architecture &amp; Solution
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
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
          <div className="pt-6 border-t border-black/10 dark:border-white/10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-800 dark:text-slate-200 font-bold mb-3">
              System Integration Details
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {study.architectureDetails}
            </p>
          </div>
        </section>

        {/* The Outcome Section */}
        <section className="p-8 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-blue" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wide">
              The Outcome
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {study.outcome}
          </p>

          <div className="pt-6 border-t border-black/10 dark:border-white/10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-800 dark:text-slate-200 font-bold mb-4">
              Engineering Deliverables &amp; Verified Results
            </h3>
            <ul className="space-y-3">
              {study.outcomes.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-slate-600 dark:text-slate-400 hover:text-orange transition-colors"
          >
            ← Back to Portfolio
          </Link>
          <span className="text-xs font-mono text-slate-500">
            Node: {study.slug}
          </span>
        </div>
      </div>
    </div>
  );
}
