import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Komunikonek: Barangay Digital Hub | Jose Lorenzo Discutido",
  description:
    "Real-Time Civic Mobile Dashboard | Dart, Flutter, Firebase, Cloudinary",
  alternates: {
    canonical: `${SITE_URL}/projects/komunikonek`,
  },
  openGraph: {
    title: "Komunikonek: Barangay Digital Hub | Jose Lorenzo Discutido",
    description:
      "Real-Time Civic Mobile Dashboard | Dart, Flutter, Firebase, Cloudinary",
    url: `${SITE_URL}/projects/komunikonek`,
    type: "article",
  },
};

const techStack = [
  {
    name: "Flutter & Dart",
    role: "Frontend UI Framework",
  },
  {
    name: "Firebase Auth",
    role: "Secure Citizen Access",
  },
  {
    name: "Cloud Firestore",
    role: "Real-Time NoSQL Database",
  },
  {
    name: "Cloudinary",
    role: "Optimized Media & Image Storage",
  },
];

const features = [
  {
    title: "Digital Document Requests",
    details:
      "Residents can request clearances and permits directly through the app, complete with real-time status tracking via Firestore streams.",
  },
  {
    title: "Civic Complaint Ticketing",
    details:
      "An automated ticketing system for local issues. Residents can upload photo evidence (optimized and hosted via Cloudinary) mapped to their specific reports.",
  },
  {
    title: "Community Polling",
    details:
      "Interactive, real-time voting modules to ensure every resident has a voice in upcoming community projects and barangay initiatives.",
  },
];

const screenshotPlaceholders = [
  {
    screenNumber: "01",
    title: "Document Requests",
    description: "Clearance & Permit Submission with Real-Time Stream",
  },
  {
    screenNumber: "02",
    title: "Complaint Ticketing",
    description: "Automated Ticket System & Cloudinary Evidence Upload",
  },
  {
    screenNumber: "03",
    title: "Community Polling",
    description: "Interactive Live Ballot & Citizen Feedback Interface",
  },
];

export default function KomunikonekPage() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Navigation */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold font-mono text-slate-400 hover:text-[#0052FF] transition-colors duration-200 mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
        </Link>

        {/* Header Section */}
        <header className="mb-12">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#0052FF] mb-3">
            // CASE STUDY: 02
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f8fafc] tracking-tight mb-4 font-sans">
            Komunikonek: Barangay Digital Hub
          </h1>
          <p className="text-slate-400 font-mono text-sm sm:text-base font-semibold mb-6">
            Real-Time Civic Mobile Dashboard | Dart, Flutter, Firebase
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://github.com/lorenzdiscutido/Komunikonek-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e2128] border border-white/5 hover:border-[#0052FF]/50 text-[#f8fafc] font-mono text-xs font-semibold transition-colors duration-200 shadow-none"
            >
              Source Repository →
            </a>
          </div>
        </header>

        {/* Tech Stack Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none flex flex-col justify-between"
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#0052FF]/10 border border-[#0052FF]/30 text-[#0052FF]">
                    {item.name}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#f8fafc] font-sans">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Civic Tech Objective */}
        <section className="mb-16">
          <div className="p-8 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 shadow-none">
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#f8fafc] mb-4 flex items-center gap-2">
              <span className="text-[#0052FF] font-bold font-mono">&gt;</span> The Barangay Problem
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-sans">
              Komunikonek was engineered to digitize and streamline local governance. It serves as a centralized, real-time mobile communication hub for barangay residents, transforming slow, paper-based local administration into an accessible digital dashboard.
            </p>
          </div>
        </section>

        {/* Core UX & Features */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((card, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#1e2128]/80 backdrop-blur-md border border-white/5 hover:border-[#0052FF]/50 transition-colors duration-200 flex flex-col justify-between shadow-none"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#0052FF]">
                      0{idx + 1}.
                    </span>
                    <h3 className="text-lg font-bold text-[#f8fafc] font-sans">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-sans">
                    {card.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Interface Gallery */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#f8fafc] mb-6 flex items-center gap-2">
            <span className="text-[#0052FF] font-bold font-mono">&gt;</span> Mobile Interface Walkthrough
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {screenshotPlaceholders.map((screen, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center"
              >
                <div className="w-full aspect-[9/16] rounded-2xl border border-white/5 bg-[#1e2128]/80 backdrop-blur-md p-4 flex flex-col justify-between shadow-none relative overflow-hidden group hover:border-[#0052FF]/50 transition-colors duration-200">
                  {/* Smartphone Top Notch */}
                  <div className="w-full flex justify-center">
                    <div className="w-20 h-1.5 rounded-full bg-white/10" />
                  </div>

                  {/* Mobile Screen Placement Body */}
                  <div className="w-full flex-grow my-4 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center p-6 text-center bg-[#0f1115]/50">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/30 mb-3">
                      Screen {screen.screenNumber}
                    </span>
                    <p className="font-mono text-sm font-bold text-[#f8fafc] mb-2">
                      {screen.title}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[200px] font-sans">
                      {screen.description}
                    </p>
                    <span className="mt-4 font-mono text-[10px] uppercase tracking-wider text-slate-400/60">
                      9:16 Mobile UI Screenshot
                    </span>
                  </div>

                  {/* Smartphone Bottom Home Bar */}
                  <div className="w-full flex justify-center">
                    <div className="w-16 h-1 rounded-full bg-white/10" />
                  </div>
                </div>

                {/* Technical Caption */}
                <p className="mt-3 text-xs font-mono text-slate-400 text-center px-2">
                  <span className="font-bold text-[#f8fafc]">UI Screen {screen.screenNumber}:</span> {screen.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
