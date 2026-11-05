"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const fullText = "> guest@jld-sys:~$ initiating profile...";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 35);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col justify-start px-6 pt-32 pb-20">
      <div className="max-w-5xl mx-auto w-full text-left">
        {/* Profile Avatar / Headshot (Left-Aligned) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-start mb-8"
        >
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-blue via-orange to-blue shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-surface flex items-center justify-center border-2 border-base relative shadow-inner">
                {!imageError ? (
                  <Image
                    src="/profile.jpg"
                    alt="Jose Lorenzo Discutido"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover object-top"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-primary">
                    <span className="font-extrabold text-2xl tracking-tighter text-blue">
                      JL<span className="text-orange">D</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono text-muted tracking-widest mt-0.5">
                      Systems Eng
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Availability status beacon */}
            <div className="absolute -bottom-2.5 left-0 whitespace-nowrap bg-base/80 backdrop-blur-md border border-[#2d313a] px-3 py-0.5 rounded-full flex items-center gap-2 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-muted">
                Available for Systems Projects
              </span>
            </div>
          </div>
        </motion.div>

        {/* Boot Sequence Typewriter & Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="mb-4"
        >
          <div className="font-mono text-xs md:text-sm text-orange font-semibold tracking-wider flex items-center gap-1">
            <span>{typedText}</span>
            <span className="animate-pulse inline-block w-2 h-4 bg-orange"></span>
          </div>
          <h2 className="text-sm md:text-base font-semibold tracking-widest uppercase text-muted mt-2">
            Jose Lorenzo Discutido
          </h2>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
            textShadow: "0px 0px 14px rgba(0,82,255,0.8)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            textShadow: "0px 0px 0px rgba(0,82,255,0)",
          }}
          transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-primary mb-6 tracking-tight"
        >
          Digital Data &amp; <span className="text-blue">Systems Engineer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted mb-10 max-w-3xl leading-relaxed"
        >
          I build hardware integrations and automate enterprise cloud environments. With a background in Big Data Analytics, I focus on eliminating bottlenecks—from master-master database networks to automated defect logging. Currently architecting systems at Vonotec.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-start"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-blue text-primary font-medium hover:opacity-90 transition-opacity text-center sm:text-left"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg bg-surface/60 backdrop-blur-md border border-[#2d313a] hover:border-orange text-primary font-medium transition-colors text-center sm:text-left"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
