export default function Projects() {
  const projects = [
    {
      title: "Gemini Defect Logger",
      role: "Lead Developer",
      stack: ["Python", "Streamlit", "Gemini API", "SharePoint"],
      description: "Developed an automated defect logging application that utilizes the Google Gemini API to process field inspection photographs. The system extracts defect dimensions and logs the structured data directly into enterprise SharePoint Excel workbooks, eliminating manual data entry bottlenecks."
    },
    {
      title: "IsKiosk Terminal",
      role: "Systems Engineer / Hardware Integrator",
      stack: ["C/C++", "Microcontrollers", "UI Design"],
      description: "Architected an automated document management terminal featuring integrated barcode sticker printing and hardware-level solenoid drawer locks. The complete system was evaluated and validated for ISO/IEC 25010 software quality compliance."
    },
    {
      title: "Tailscale DB Cluster",
      role: "Network & Database Engineer",
      stack: ["MySQL", "Linux", "Tailscale"],
      description: "Designed and deployed a multi-node, master-master MySQL database replication cluster. Leveraged Tailscale to establish secure, low-latency network routing across distributed Linux devices for continuous enterprise data synchronization."
    }
  ];

  return (
    <section id="projects" className="py-20 bg-base px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured <span className="text-blue">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-orange mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-surface rounded-xl p-8 border border-transparent hover:border-orange transition-colors duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-primary mb-1">{project.title}</h3>
              <p className="text-orange text-sm font-semibold tracking-wide uppercase mb-4">{project.role}</p>
              
              <p className="text-muted leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-semibold text-primary bg-base px-3 py-1 rounded-full border border-[#2d313a]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
