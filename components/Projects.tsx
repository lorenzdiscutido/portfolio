"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { caseStudies } from "@/lib/caseStudyData";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-orange-700 dark:text-orange font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">
            Selected Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Featured <span className="text-blue">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className={`rounded-xl p-8 border transition-all duration-300 flex flex-col ${
                  isFeatured
                    ? "md:col-span-2 bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border-blue/40 hover:border-orange shadow-lg"
                    : "bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange shadow-lg"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  {isFeatured && (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue bg-blue/10 px-2.5 py-0.5 rounded border border-blue/30 self-start sm:self-auto font-semibold">
                      Primary Case Study
                    </span>
                  )}
                </div>

                <p className="text-orange-700 dark:text-orange text-sm font-semibold tracking-wide uppercase mb-4">
                  {project.role}
                </p>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                  {project.overview}
                </p>

                {/* Quantified Metrics Highlight Bar */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-3.5 rounded-xl bg-white/70 dark:bg-black/30 backdrop-blur-sm border border-black/10 dark:border-white/10">
                  {project.metrics.map((m, mi) => (
                    <div key={mi} className="text-center sm:text-left">
                      <span className="block text-sm sm:text-base font-extrabold text-blue dark:text-blue tracking-tight font-mono">
                        {m.value}
                      </span>
                      <span className="block text-[10px] sm:text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium leading-tight">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs font-medium text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-black/10 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-blue hover:text-orange-600 dark:hover:text-orange transition-colors"
                  >
                    View Architecture &amp; Case Study →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
