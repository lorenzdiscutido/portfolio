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
    <section id="experience" className="py-24 lg:py-32 px-6 border-t-[0.5px] border-white/10 dark:border-white/10 border-black/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-left">
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

        <div className="relative ml-4 md:ml-8 space-y-12">
          {/* Vertical rail */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-[0.5px] -translate-x-1/2 bg-black/10 dark:bg-white/10"
          />
          {timeline.map((item, index) => (
            <div key={index} className="relative group pl-8 md:pl-12">
              {/* Timeline node marker */}
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border border-base ring-2 ring-[#0052FF]/20 dark:ring-[#38bdf8]/20 bg-[#0052FF] dark:bg-[#38bdf8] group-hover:bg-[#FF7A00] transition-colors duration-200" />

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
                        ? "bg-[#ea580c]/10 dark:bg-[#FF7A00]/10 border-[#ea580c]/30 dark:border-[#FF7A00]/30 text-[#ea580c] dark:text-[#FF7A00] font-medium"
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
    </section>
  );
}
