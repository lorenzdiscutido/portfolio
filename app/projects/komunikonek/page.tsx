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

export default function KomunikonekPage() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Navigation */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold font-mono text-muted hover:text-[#0052FF] transition-colors duration-200 mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
        </Link>

        {/* Header Section */}
        <header className="mb-12">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#0052FF] mb-3">
            {"// CASE STUDY: 02"}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight mb-4 font-sans">
            Komunikonek: Barangay Digital Hub
          </h1>
          <p className="text-muted font-mono text-sm sm:text-base font-semibold mb-6">
            Real-Time Civic Mobile Dashboard | Dart, Flutter, Firebase
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://github.com/lorenzdiscutido/Komunikonek-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-black/10 dark:border-white/5 hover:border-[#0052FF]/50 text-primary font-mono text-xs font-semibold transition-colors duration-200 shadow-none"
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
                className="p-5 rounded-2xl bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none flex flex-col justify-between"
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#0052FF]/10 border border-[#0052FF]/30 text-[#0052FF]">
                    {item.name}
                  </span>
                </div>
                <p className="text-sm font-semibold text-primary font-sans">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Civic Tech Objective */}
        <section className="mb-16">
          <div className="p-8 rounded-2xl bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-none">
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-primary mb-4 flex items-center gap-2">
              <span aria-hidden="true" className="text-[#0052FF] dark:text-[#38bdf8] font-bold font-mono">&gt;</span> The Barangay Governance Challenge
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed font-sans">
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
                className="p-6 rounded-2xl bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 hover:border-[#0052FF]/50 transition-colors duration-200 flex flex-col justify-between shadow-none"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#0052FF] dark:text-[#38bdf8]">
                      0{idx + 1}.
                    </span>
                    <h3 className="text-lg font-bold text-primary font-sans">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed font-sans">
                    {card.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Interface Gallery */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-primary mb-6 flex items-center gap-2">
            <span aria-hidden="true" className="text-[#0052FF] dark:text-[#38bdf8] font-bold font-mono">&gt;</span> Mobile Interface Walkthrough
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SCREEN 01: Document Request Flow */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[320px] mx-auto aspect-[9/18.5] rounded-3xl border border-white/10 dark:border-white/10 border-black/10 bg-[#0d1117] text-white p-3.5 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#0052FF]/50 transition-all duration-300">
                {/* Smartphone Top Notch & Status Bar */}
                <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 text-[10px] font-mono text-slate-400">
                  <span>09:41</span>
                  <div className="w-16 h-3 rounded-full bg-black/60 mx-auto" />
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span className="w-2.5 h-1.5 rounded-sm border border-slate-400 block" />
                  </div>
                </div>

                {/* Mobile UI Screen Body */}
                <div className="w-full flex-grow flex flex-col justify-between p-2 space-y-2.5 overflow-hidden">
                  {/* App Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#38bdf8] tracking-widest block">Barangay Hub</span>
                      <h4 className="text-xs font-bold text-white font-sans">Document Request</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ID #8192
                    </span>
                  </div>

                  {/* Active Document Card */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-white">Barangay Clearance</span>
                      <span className="text-[8px] font-mono text-[#38bdf8] uppercase">Employment</span>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-tight">
                      Purpose: First-time jobseeker statutory clearance.
                    </p>
                  </div>

                  {/* Status Tracking Stepper */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">Live Processing Pipeline</span>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[9px]">
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[8px]">✓</span>
                        <span className="text-slate-200 font-medium">Submitted</span>
                        <span className="text-[8px] font-mono text-slate-500 ml-auto">09:12 AM</span>
                      </div>
                      <div className="flex items-center gap-2 text-[9px]">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#0052FF]/30 text-[#38bdf8] flex items-center justify-center font-bold text-[8px] animate-pulse">●</span>
                        <span className="text-[#38bdf8] font-medium">Captain Review</span>
                        <span className="text-[8px] font-mono text-[#38bdf8] ml-auto">In Progress</span>
                      </div>
                      <div className="flex items-center gap-2 text-[9px] opacity-40">
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-500 flex items-center justify-center text-[8px]">○</span>
                        <span className="text-slate-400 font-medium">Ready for Release</span>
                        <span className="text-[8px] font-mono text-slate-500 ml-auto">Pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Digital Certificate Barcode Preview */}
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center space-y-1">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">Digital Token Barcode</span>
                    {/* Simulated SVG Barcode */}
                    <svg className="w-full h-7 mx-auto" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <rect x="2" y="0" width="2" height="24" fill="#38bdf8" />
                      <rect x="6" y="0" width="1" height="24" fill="#38bdf8" />
                      <rect x="9" y="0" width="3" height="24" fill="#38bdf8" />
                      <rect x="14" y="0" width="1.5" height="24" fill="#38bdf8" />
                      <rect x="18" y="0" width="2.5" height="24" fill="#38bdf8" />
                      <rect x="23" y="0" width="1" height="24" fill="#38bdf8" />
                      <rect x="26" y="0" width="3" height="24" fill="#38bdf8" />
                      <rect x="32" y="0" width="1" height="24" fill="#38bdf8" />
                      <rect x="35" y="0" width="2" height="24" fill="#38bdf8" />
                      <rect x="40" y="0" width="3.5" height="24" fill="#38bdf8" />
                      <rect x="46" y="0" width="1" height="24" fill="#38bdf8" />
                      <rect x="50" y="0" width="2.5" height="24" fill="#38bdf8" />
                      <rect x="55" y="0" width="1.5" height="24" fill="#38bdf8" />
                      <rect x="59" y="0" width="3" height="24" fill="#38bdf8" />
                      <rect x="65" y="0" width="1" height="24" fill="#38bdf8" />
                      <rect x="68" y="0" width="2" height="24" fill="#38bdf8" />
                      <rect x="73" y="0" width="1.5" height="24" fill="#38bdf8" />
                      <rect x="77" y="0" width="3" height="24" fill="#38bdf8" />
                      <rect x="83" y="0" width="1" height="24" fill="#38bdf8" />
                      <rect x="86" y="0" width="2.5" height="24" fill="#38bdf8" />
                      <rect x="91" y="0" width="1.5" height="24" fill="#38bdf8" />
                      <rect x="95" y="0" width="3" height="24" fill="#38bdf8" />
                    </svg>
                    <span className="text-[8px] font-mono font-bold text-white tracking-widest block">
                      BRGY-CLR-2024-8192
                    </span>
                  </div>
                </div>

                {/* Smartphone Bottom Home Bar */}
                <div className="w-full flex justify-center pt-2">
                  <div className="w-16 h-1 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Technical Caption */}
              <p className="mt-3 text-xs font-mono text-muted text-center px-2">
                <span className="font-bold text-primary">UI Screen 01:</span> Document Request Stepper &amp; Barcode Token
              </p>
            </div>

            {/* SCREEN 02: Civic Complaint Ticketing */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[320px] mx-auto aspect-[9/18.5] rounded-3xl border border-white/10 dark:border-white/10 border-black/10 bg-[#0d1117] text-white p-3.5 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#0052FF]/50 transition-all duration-300">
                {/* Smartphone Top Notch & Status Bar */}
                <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 text-[10px] font-mono text-slate-400">
                  <span>10:15</span>
                  <div className="w-16 h-3 rounded-full bg-black/60 mx-auto" />
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span className="w-2.5 h-1.5 rounded-sm border border-slate-400 block" />
                  </div>
                </div>

                {/* Mobile UI Screen Body */}
                <div className="w-full flex-grow flex flex-col justify-between p-2 space-y-2.5 overflow-hidden">
                  {/* App Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#38bdf8] tracking-widest block">Incident Intake</span>
                      <h4 className="text-xs font-bold text-white font-sans">Ticket #MNL-2024-0891</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                      URGENT
                    </span>
                  </div>

                  {/* Incident Category & Location */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                    <span className="text-[9px] font-mono uppercase text-slate-400 block">Category</span>
                    <p className="text-[10px] font-bold text-white">Public Lighting &amp; Electrical Hazard</p>
                    <p className="text-[9px] text-slate-400 leading-tight">
                      Location: Purok 4, Main Highway corner Acacia St.
                    </p>
                  </div>

                  {/* Geotag GPS Block */}
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-[8px] font-mono">
                      <span className="text-[#38bdf8] font-bold">📍 GPS TELEMETRY LOCKED</span>
                      <span className="text-emerald-400">±2.4m</span>
                    </div>
                    <p className="text-[9px] font-mono text-slate-200">
                      14.5995° N, 120.9842° E
                    </p>
                  </div>

                  {/* Cloudinary Media Thumbnail */}
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
                      <span>EVIDENCE PHOTO</span>
                      <span className="text-[#38bdf8]">Cloudinary CDN</span>
                    </div>
                    <div className="h-14 rounded-lg bg-slate-800/80 border border-white/10 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center">
                        <span className="text-[10px] block">⚡ Streetlight_0891.jpg</span>
                        <span className="text-[8px] text-slate-400 font-mono">1.8 MB • Encrypted Stream</span>
                      </div>
                    </div>
                  </div>

                  {/* Dispatch Notice */}
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-300 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>Dispatched: Engineering Quick Response</span>
                  </div>
                </div>

                {/* Smartphone Bottom Home Bar */}
                <div className="w-full flex justify-center pt-2">
                  <div className="w-16 h-1 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Technical Caption */}
              <p className="mt-3 text-xs font-mono text-muted text-center px-2">
                <span className="font-bold text-primary">UI Screen 02:</span> Geotagged Complaint Intake &amp; Media Upload
              </p>
            </div>

            {/* SCREEN 03: Community Polling & Voting */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[320px] mx-auto aspect-[9/18.5] rounded-3xl border border-white/10 dark:border-white/10 border-black/10 bg-[#0d1117] text-white p-3.5 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#0052FF]/50 transition-all duration-300">
                {/* Smartphone Top Notch & Status Bar */}
                <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 text-[10px] font-mono text-slate-400">
                  <span>14:30</span>
                  <div className="w-16 h-3 rounded-full bg-black/60 mx-auto" />
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span className="w-2.5 h-1.5 rounded-sm border border-slate-400 block" />
                  </div>
                </div>

                {/* Mobile UI Screen Body */}
                <div className="w-full flex-grow flex flex-col justify-between p-2 space-y-2.5 overflow-hidden">
                  {/* App Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#38bdf8] tracking-widest block">Citizen Democracy</span>
                      <h4 className="text-xs font-bold text-white font-sans">Community Ballot</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#0052FF]/20 text-[#38bdf8] border border-[#0052FF]/40">
                      LIVE POLL
                    </span>
                  </div>

                  {/* Active Ballot Proposition */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-[#38bdf8]">Ordinance #2024-B</span>
                    <h5 className="text-[10px] font-bold text-white leading-tight">Solar Alleyway Illumination Initiative</h5>
                    <p className="text-[8px] text-slate-400 leading-tight">
                      Deploy 45 standalone solar LED fixtures across Puroks 1 to 6.
                    </p>
                  </div>

                  {/* Real-Time Live Vote Tally Progress Bars */}
                  <div className="space-y-2">
                    {/* YES Option */}
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-[9px] font-semibold">
                        <span className="text-white flex items-center gap-1">
                          <span className="text-emerald-400">✔</span> In Favor (Yes)
                        </span>
                        <span className="font-mono text-[#38bdf8]">78% (1,420)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[78%] h-full bg-gradient-to-r from-[#0052FF] to-[#38bdf8] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                      </div>
                    </div>

                    {/* NO Option */}
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-[9px] font-semibold">
                        <span className="text-slate-300">Defer / Oppose (No)</span>
                        <span className="font-mono text-slate-400">22% (401)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-[22%] h-full bg-slate-600 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Firestore Stream Acknowledgment Pill */}
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-300 font-mono text-center flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Firestore Stream Sync: Verified</span>
                  </div>
                </div>

                {/* Smartphone Bottom Home Bar */}
                <div className="w-full flex justify-center pt-2">
                  <div className="w-16 h-1 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Technical Caption */}
              <p className="mt-3 text-xs font-mono text-muted text-center px-2">
                <span className="font-bold text-primary">UI Screen 03:</span> Real-Time Citizen Polling &amp; Ballot Tally
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
