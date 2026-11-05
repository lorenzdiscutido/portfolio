import Link from "next/link";
import { caseStudies } from "@/lib/caseStudyData";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import HardwareSchematic from "@/components/HardwareSchematic";

export function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-orange font-semibold tracking-wide uppercase mb-2">
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
            className="inline-block px-6 py-3 rounded-lg bg-white dark:bg-[#1e2128] border border-black/10 dark:border-white/10 hover:border-orange text-slate-900 dark:text-white font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue dark:hover:text-blue transition-colors mb-8"
        >
          <span>←</span> Back to Projects
        </Link>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {study.title}
        </h1>
        <p className="text-orange font-mono text-sm sm:text-base font-bold tracking-wider uppercase mb-8">
          {study.role}
        </p>

        {/* Quantified Impact / 3-Metric Stat Banner */}
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

        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-12">
          {study.overview}
        </p>

        {/* Interactive Architecture & Signal Stream */}
        <ArchitectureDiagram slug={study.slug} />

        {/* Physical Hardware Schematics for IsKiosk */}
        {study.slug === "iskiosk-terminal" && <HardwareSchematic />}

        <div className="p-8 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Architecture &amp; System Integration Deep Dive
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            {study.architectureDetails}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-8 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Technical <span className="text-blue">Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {study.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="font-mono text-xs font-medium text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-xl bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Verified <span className="text-orange">Outcomes</span>
            </h2>
            <ul className="space-y-4">
              {study.outcomes.map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-700 dark:text-slate-300 leading-relaxed text-sm"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-blue shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
