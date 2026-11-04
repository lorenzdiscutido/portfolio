export default function Footer() {
  return (
    <footer id="contact" className="bg-surface pt-20 pb-10 px-6 border-t border-[#2d313a]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Let's <span className="text-orange">Connect</span>
        </h2>
        <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
          Whether you need a pragmatic systems engineer for your next enterprise deployment or want to talk about hardware and IoT integrations, my inbox is always open.
        </p>
        
        <a 
          href="mailto:lorenzdiscutido@gmail.com" 
          className="inline-block px-8 py-3 rounded-lg bg-blue text-primary font-medium hover:opacity-90 transition-opacity mb-16"
        >
          Say Hello
        </a>

        <div className="flex justify-center gap-8 mb-12">
          <a 
            href="https://github.com/lorenzdiscutido" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted hover:text-blue transition-colors font-medium tracking-wide"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/discutido-lorenzo/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted hover:text-blue transition-colors font-medium tracking-wide"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-muted text-sm">
          © {new Date().getFullYear()} Jose Lorenzo Discutido. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
