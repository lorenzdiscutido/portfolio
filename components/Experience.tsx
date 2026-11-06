import React from "react";

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: "Work" | "Internship" | "Education";
  highlights: string[];
}

export default function Experience() {
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
    <section id="experience" className="py-20 px-6 border-t border-black/10 dark:border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-orange-700 dark:text-orange font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">
            Career Timeline
          </p>
          <h2 className="theme-text-primary text-3xl md:text-4xl font-bold mb-2">
            Experience &amp; <span className="text-blue-600 dark:text-blue-400">Education</span>
          </h2>
          <p className="theme-text-secondary text-slate-800 dark:text-slate-300 font-semibold text-sm md:text-base mt-2 max-w-xl">
            From Big Data Analytics at PUP and enterprise cloud training at PHINMA to full-stack systems and AI/IoT engineering at Vonotec.
          </p>
        </div>

        <div className="relative ml-4 md:ml-8 space-y-12">
          {/* Vertical rail: anchored at left-0 and centered on that coordinate */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-slate-300 dark:bg-white/20"
          />
          {timeline.map((item, index) => (
            <div key={index} className="relative group pl-8 md:pl-12">
              {/* Timeline node marker: shares left-0 with the rail, centered via -translate-x-1/2 */}
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-base ring-2 ring-blue-600/30 dark:ring-blue-400/30 bg-blue-600 dark:bg-blue-400 group-hover:bg-orange group-hover:ring-orange/40 transition-all group-hover:scale-125" />

              <div className="bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg p-6 md:p-8 rounded-xl hover:border-orange dark:hover:border-orange transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-orange-700 dark:text-orange uppercase tracking-wider">
                    {item.period}
                  </span>
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded border self-start sm:self-auto ${
                      item.type === "Work"
                        ? "bg-blue-600/10 dark:bg-blue-400/10 border-blue-600/30 dark:border-blue-400/30 text-blue-600 dark:text-blue-400 font-semibold"
                        : item.type === "Internship"
                        ? "bg-orange-50 dark:bg-orange/10 border-orange-200 dark:border-orange text-orange-700 dark:text-orange font-semibold"
                        : "bg-slate-900/10 dark:bg-white/10 border-slate-900/30 dark:border-white/30 theme-text-primary font-semibold"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <h3 className="theme-text-primary text-xl md:text-2xl font-bold mb-1">
                  {item.role}
                </h3>

                <p className="theme-text-secondary text-sm font-medium mb-4">
                  <strong className="theme-text-primary">{item.organization}</strong>{" "}
                  • {item.location}
                </p>

                <ul className="space-y-2.5">
                  {item.highlights.map((point, i) => (
                    <li
                      key={i}
                      className="theme-text-secondary text-sm leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
