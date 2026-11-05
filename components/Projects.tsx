import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      slug: "gemini-defect-logger",
      title: "Gemini Defect Logger",
      role: "Lead Developer",
      stack: ["Python", "Streamlit", "Gemini API", "SharePoint"],
      description:
        "Developed an automated defect logging application that utilizes the Google Gemini API to process field inspection photographs. The system extracts defect dimensions and logs the structured data directly into enterprise SharePoint Excel workbooks, eliminating manual data entry bottlenecks.",
    },
    {
      slug: "iskiosk-terminal",
      title: "IsKiosk Terminal",
      role: "Systems Engineer / Hardware Integrator",
      stack: ["C/C++", "Microcontrollers", "UI Design"],
      description:
        "Architected an automated document management terminal featuring integrated barcode sticker printing and hardware-level solenoid drawer locks. The complete system was evaluated and validated for ISO/IEC 25010 software quality compliance.",
    },
    {
      slug: "tailscale-db-cluster",
      title: "Tailscale DB Cluster",
      role: "Network & Database Engineer",
      stack: ["MySQL", "Linux", "Tailscale"],
      description:
        "Designed and deployed a multi-node, master-master MySQL database replication cluster. Leveraged Tailscale to establish secure, low-latency network routing across distributed Linux devices for continuous enterprise data synchronization.",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-base px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <p className="text-orange font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">
            Selected Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Featured <span className="text-blue">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={index}
                className={`rounded-xl p-8 border transition-all duration-300 flex flex-col ${
                  isFeatured
                    ? "md:col-span-2 bg-surface border-blue/30 bg-blue/[0.04] hover:border-orange shadow-lg"
                    : "bg-surface border-[#2d313a] hover:border-orange"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-primary">
                    {project.title}
                  </h3>
                  {isFeatured && (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue bg-blue/10 px-2.5 py-0.5 rounded border border-blue/30 self-start sm:self-auto">
                      Primary Case Study
                    </span>
                  )}
                </div>

                <p className="text-orange text-sm font-semibold tracking-wide uppercase mb-4">
                  {project.role}
                </p>

                <p className="text-muted leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs font-medium text-primary bg-base px-3 py-1 rounded-full border border-[#2d313a]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-blue hover:text-orange transition-colors"
                  >
                    View Architecture &amp; Case Study →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
