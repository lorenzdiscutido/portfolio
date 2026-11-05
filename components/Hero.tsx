"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-base px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Avatar / Headshot Placeholder */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative group">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-blue to-orange shadow-xl transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-surface flex items-center justify-center border-2 border-base relative">
                {!imageError ? (
                  <Image
                    src="/profile.jpg"
                    alt="Jose Lorenzo Discutido"
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-primary">
                    <span className="font-extrabold text-2xl md:text-3xl tracking-tighter text-blue">
                      JL<span className="text-orange">D</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono text-muted tracking-widest mt-1">
                      Systems Eng
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Availability status beacon */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-base border border-[#2d313a] px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-muted">
                Available for Systems Projects
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-orange font-semibold tracking-widest uppercase mb-4 text-sm md:text-base mt-4">
          Jose Lorenzo Discutido
        </h2>

        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6 leading-tight">
          Digital Data &amp; <span className="text-blue">Systems Engineer</span>
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
