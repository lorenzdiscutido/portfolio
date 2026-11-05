"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  context: string;
}

interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export default function About() {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const techStack: SkillCategory[] = [
    {
      category: "Languages & Frameworks",
      skills: [
        {
          name: "Python (Streamlit, Pandas)",
          context:
            "Engineered automated inspection pipelines and structured data extraction with Gemini API & SharePoint.",
        },
        {
          name: "Dart / Flutter",
          context:
            "Built cross-platform field utility interfaces and responsive mobile client applications.",
        },
        {
          name: "Next.js",
          context:
            "Full-stack App Router development with serverless API route handlers and performance caching.",
        },
        {
          name: "C / C++",
          context:
            "Authored low-level microcontroller firmware, serial UART protocol handlers, and watchdog routines.",
        },
      ],
    },
    {
      category: "Cloud & Enterprise Identity",
      skills: [
        {
          name: "Microsoft Entra ID",
          context:
            "Configured tenant app registrations, OAuth 2.0 client credential flows, and conditional access policies.",
        },
        {
          name: "Microsoft Intune",
          context:
            "Automated device enrollment, kiosk lockdown configurations, and remote security compliance profiles.",
        },
        {
          name: "SharePoint",
          context:
            "Automated real-time inspection logging into enterprise Excel tables via Microsoft Graph REST APIs.",
        },
        {
          name: "Odoo ERP",
          context:
            "Streamlined multi-tier approval hierarchies, operational logistics, and database workflow integrations.",
        },
      ],
    },
    {
      category: "Databases & Networking",
      skills: [
        {
          name: "MySQL",
          context:
            "Architected multi-node circular master-master GTID replication with deterministic auto-increment partitioning.",
        },
        {
          name: "PostgreSQL",
          context:
            "Relational schema design, index optimization, and transactional ACID data integrity.",
        },
        {
          name: "Prisma ORM",
          context:
            "Type-safe schema modeling, database migrations, and relation-heavy query execution.",
        },
        {
          name: "Tailscale",
          context:
            "Zero-trust peer-to-peer WireGuard mesh VPN routing with zero public port exposure for distributed databases.",
        },
      ],
    },
    {
      category: "Hardware & IoT",
      skills: [
        {
          name: "Microcontrollers",
          context:
            "Serial UART command interpretation, opto-isolated relay triggers, and sensor acquisition on ESP32/MCUs.",
        },
        {
          name: "Solenoid Integration",
          context:
            "12V DC relay actuation and magnetic reed switch feedback loops to verify physical compartment locking.",
        },
        {
          name: "Hardware Diagnostics",
          context:
            "DC power rail stability testing, serial packet sniffers, and failure-mode analysis on automated kiosk units.",
        },
      ],
    },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Engineering <span className="text-blue-600 dark:text-blue-400">Background</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Graduated with a BS in Computer Engineering (Big Data Analytics) from the Polytechnic University of the Philippines (PUP).
              </p>
              <p>
                My foundation in enterprise cloud infrastructure began at PHINMA Property Holdings. Today, as a Digital Data and Systems Engineer &amp; AI/IoT Data Officer at Vonotec, I manage Microsoft Entra ID environments, Intune device enrollment, and Odoo ERP workflows.
              </p>
              <p>
                I specialize in bridging the gap between physical hardware deployments—like automated kiosks—and cloud infrastructure.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg p-8 rounded-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Stack</h3>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded border border-black/10 dark:border-white/10">
                Hover or click for context
              </span>
            </div>

            <div className="space-y-8">
              {techStack.map((group, index) => (
                <div key={index}>
                  <h4 className="text-orange-700 dark:text-orange text-sm font-bold tracking-wide uppercase mb-3">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => {
                      const isSelected = activeSkill?.name === skill.name;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            setActiveSkill(isSelected ? null : skill)
                          }
                          onMouseEnter={() => setActiveSkill(skill)}
                          onMouseLeave={() => setActiveSkill(null)}
                          className={`text-left text-sm font-medium px-4 py-2 rounded-md border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-blue-600/10 dark:bg-blue-400/10 text-slate-900 dark:text-white border-orange shadow-md font-semibold"
                              : "bg-white/80 dark:bg-white/5 text-slate-800 dark:text-slate-200 border-black/10 dark:border-white/10 hover:border-blue-600 dark:hover:border-blue-400"
                          }`}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Context Tooltip / Callout Panel */}
            <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 min-h-[72px] flex items-center">
              {activeSkill ? (
                <div className="w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg p-4 rounded-lg transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold font-mono text-orange-700 dark:text-orange uppercase">
                      Production Application
                    </span>
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      {activeSkill.name}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeSkill.context}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center w-full">
                  Click or hover any technology above to inspect its real-world implementation in my engineering workflow.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
