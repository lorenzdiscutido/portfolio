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
    <section id="experience" className="py-20 px-6 border-t border-black/10 dark:border-white/15">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-neonPink dark:text-chartreuse font-mono font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">
            Career Timeline
          </p>
          <h2 className="theme-text-primary text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Experience &amp; <span className="text-neonPink dark:text-chartreuse">Education</span>
          </h2>
          <p className="theme-text-secondary text-slate-800 dark:text-slate-300 font-medium text-sm md:text-base mt-2 max-w-xl">
            From Big Data Analytics at PUP and enterprise cloud training at PHINMA to full-stack systems and AI/IoT engineering at Vonotec.
          </p>
        </div>

        <div className="relative ml-4 md:ml-8 space-y-12">
          {/* Vertical rail: anchored at left-0 and centered on that coordinate */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-slate-300 dark:bg-white/15"
          />
          {timeline.map((item, index) => (
            <div key={index} className="relative group pl-8 md:pl-12">
              {/* Timeline node marker */}
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-base ring-2 ring-neonPink/30 dark:ring-chartreuse/30 bg-neonPink dark:bg-chartreuse group-hover:bg-chartreuse dark:group-hover:bg-neonPink group-hover:scale-125 transition-all" />

              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-2xl p-6 md:p-8 rounded-2xl hover:border-neonPink dark:hover:border-chartreuse transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-neonPink dark:text-chartreuse uppercase tracking-wider">
                    {item.period}
                  </span>
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                      item.type === "Work"
                        ? "bg-chartreuse/10 border-chartreuse/30 text-chartreuse font-semibold"
                        : item.type === "Internship"
                        ? "bg-neonPink/10 border-neonPink/30 text-neonPink font-semibold"
                        : "bg-white/10 border-white/20 text-frost font-semibold"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <h3 className="theme-text-primary text-xl md:text-2xl font-extrabold tracking-tight mb-1">
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
                      <span className="h-1.5 w-1.5 rounded-full bg-neonPink dark:bg-chartreuse shrink-0 mt-2" />
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
