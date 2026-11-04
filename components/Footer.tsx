"use client";

import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "lorenzdiscutido@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer id="contact" className="bg-surface pt-20 pb-10 px-6 border-t border-[#2d313a]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Let&apos;s <span className="text-orange">Connect</span>
        </h2>
        <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
          Whether you need a pragmatic systems engineer for your next enterprise deployment or want to talk about hardware and IoT integrations, my inbox is always open.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={`mailto:${email}`}
            className="px-8 py-3 rounded-lg bg-blue text-primary font-medium hover:opacity-90 transition-opacity"
          >
            Say Hello
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`px-6 py-3 rounded-lg bg-base border transition-colors font-mono text-sm ${
              copied
                ? "border-orange text-orange"
                : "border-[#2d313a] hover:border-orange text-primary"
            }`}
          >
            {copied ? "✓ Copied: lorenzdiscutido@gmail.com" : "Copy Email Address"}
          </button>
        </div>

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
