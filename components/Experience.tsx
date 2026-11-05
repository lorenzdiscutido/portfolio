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
      role: "IT Intern",
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
        "Architect and Systems Engineer for the IsKiosk automated document management terminal, verified for ISO/IEC 25010 software quality compliance.",
        "Rigorous foundation in microcontroller firmware (C/C++), discrete systems, data structures, and computer networking.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-base px-6 border-t border-[#2d313a]/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Experience &amp; <span className="text-blue">Education</span>
          </h2>
          <div className="h-1 w-20 bg-orange mx-auto rounded-full"></div>
          <p className="text-muted text-sm md:text-base mt-4 max-w-xl mx-auto">
            From Big Data Analytics at PUP and enterprise cloud training at PHINMA to full-stack systems and AI/IoT engineering at Vonotec.
          </p>
        </div>

        <div className="relative border-l-2 border-[#2d313a] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline node marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-base bg-blue group-hover:bg-orange transition-all group-hover:scale-125" />

              <div className="bg-surface p-6 md:p-8 rounded-xl border border-[#2d313a] hover:border-orange transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider">
                    {item.period}
                  </span>
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded border self-start sm:self-auto ${
                      item.type === "Work"
                        ? "bg-blue/10 border-blue text-blue"
                        : item.type === "Internship"
                        ? "bg-orange/10 border-orange text-orange"
                        : "bg-primary/10 border-primary/30 text-primary"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
                  {item.role}
                </h3>

                <p className="text-muted text-sm font-medium mb-4">
                  <strong className="text-primary">{item.organization}</strong>{" "}
                  • {item.location}
                </p>

                <ul className="space-y-2.5">
                  {item.highlights.map((point, i) => (
                    <li
                      key={i}
                      className="text-muted text-sm leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue shrink-0 mt-2" />
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
