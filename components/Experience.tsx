import React from "react";

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: "Work" | "Education" | "Placeholder";
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
      period: "[ Year – Year: Placeholder ]",
      role: "[ Previous Role / Engineering Internship: Placeholder ]",
      organization: "[ Company / Organization Name: Placeholder ]",
      location: "[ Location: Placeholder ]",
      type: "Placeholder",
      highlights: [
        "[ Tell me if you have a previous internship or project experience to list here, or we can remove this card ]",
        "Assisted in hardware testing, network diagnostics, or software development support.",
      ],
    },
    {
      period: "[ Graduation Year: Placeholder ]",
      role: "Bachelor of Science in Computer Engineering",
      organization: "Polytechnic University of the Philippines (PUP)",
      location: "Sta. Mesa, Manila",
      type: "Education",
      highlights: [
        "Specialized in hardware-software interfacing, embedded microcontrollers, and distributed systems architecture.",
        "Lead Developer / Hardware Integrator for the IsKiosk automated terminal, achieving ISO/IEC 25010 software quality compliance.",
        "Rigorous coursework in digital electronics, microprocessors, operating systems, and computer networking.",
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
            My journey from Computer Engineering research at PUP to architecting enterprise cloud and physical hardware deployments at Vonotec.
          </p>
        </div>

        <div className="relative border-l-2 border-[#2d313a] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {timeline.map((item, index) => {
            const isPlaceholder = item.type === "Placeholder";
            return (
              <div key={index} className="relative group">
                {/* Timeline node marker */}
                <div
                  className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-base transition-transform group-hover:scale-125 ${
                    isPlaceholder
                      ? "bg-muted/50 border-dashed"
                      : "bg-blue group-hover:bg-orange"
                  }`}
                />

                <div
                  className={`bg-surface p-6 md:p-8 rounded-xl border transition-all ${
                    isPlaceholder
                      ? "border-dashed border-[#2d313a] opacity-75 hover:opacity-100"
                      : "border-[#2d313a] hover:border-orange"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider">
                      {item.period}
                    </span>
                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded border self-start sm:self-auto ${
                        item.type === "Work"
                          ? "bg-blue/10 border-blue text-blue"
                          : item.type === "Education"
                          ? "bg-orange/10 border-orange text-orange"
                          : "bg-muted/10 border-muted text-muted"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
