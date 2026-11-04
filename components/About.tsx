export default function About() {
  const techStack = [
    {
      category: "Languages & Frameworks",
      skills: ["Python (Streamlit, Pandas)", "Dart / Flutter", "Next.js", "C / C++"]
    },
    {
      category: "Cloud & Enterprise Identity",
      skills: ["Microsoft Entra ID", "Microsoft Intune", "SharePoint", "Odoo ERP"]
    },
    {
      category: "Databases & Networking",
      skills: ["MySQL", "PostgreSQL", "Prisma ORM", "Tailscale"]
    },
    {
      category: "Hardware & IoT",
      skills: ["Microcontrollers", "Solenoid Integration", "Hardware Diagnostics"]
    }
  ];

  return (
    <section id="about" className="py-20 bg-base px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Engineering <span className="text-blue">Background</span>
            </h2>
            <div className="space-y-6 text-lg text-muted leading-relaxed">
              <p>
                I graduated with a Bachelor of Science in Computer Engineering from the <strong className="text-primary font-semibold">Polytechnic University of the Philippines (PUP)</strong>. My academic foundation instilled a deep understanding of how software interfaces with physical hardware, which I apply to architecting resilient, end-to-end systems.
              </p>
              <p>
                Currently, I work as a Digital Data and Systems Engineer & AI/IoT Data Officer at <strong className="text-primary font-semibold">Vonotec</strong>. I specialize in bridging the gap between physical deployments—like automated kiosks and hardware locks—and enterprise cloud environments.
              </p>
              <p>
                From deploying master-master Tailscale networks to optimizing Odoo ERP approval workflows and managing device enrollments via Intune, I focus on eliminating bottlenecks through pragmatic system design.
              </p>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-xl border border-[#2d313a]">
            <h3 className="text-2xl font-bold text-primary mb-8">Technical Stack</h3>
            <div className="space-y-8">
              {techStack.map((group, index) => (
                <div key={index}>
                  <h4 className="text-orange text-sm font-bold tracking-wide uppercase mb-3">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="bg-base text-primary text-sm font-medium px-4 py-2 rounded-md border border-[#2d313a] hover:border-blue transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
