export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-base px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-orange font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">
          Jose Lorenzo Discutido
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6 leading-tight">
          Digital Data & <span className="text-blue">Systems Engineer</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          With a foundation in Computer Engineering, I design and deploy comprehensive technical solutions. Whether I am managing Microsoft Entra ID environments, integrating the Gemini API for automated defect logging, or assembling master-master Tailscale networks, my focus is on building resilient, high-efficiency infrastructure.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#projects" 
            className="px-8 py-3 rounded-lg bg-blue text-primary font-medium hover:opacity-90 transition-opacity"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 rounded-lg bg-surface border border-surface hover:border-orange text-primary font-medium transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
