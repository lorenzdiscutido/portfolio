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
          className="inline-flex items-center gap-2 text-sm font-semibold font-mono text-slate-600 dark:text-slate-400 hover:text-neonPink dark:hover:text-chartreuse transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
        </Link>

        {/* [Header Section] */}
        <header className="mb-12">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-neonPink dark:text-chartreuse mb-3">
            // CASE STUDY: 02
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Komunikonek: Barangay Digital Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-mono text-sm sm:text-base font-semibold mb-6">
            Real-Time Civic Mobile Dashboard | Dart, Flutter, Firebase
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://github.com/lorenzdiscutido/Komunikonek-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/15 hover:border-neonPink dark:hover:border-chartreuse text-slate-900 dark:text-white font-mono text-xs font-semibold transition-all shadow-sm"
            >
              Source Repository →
            </a>
          </div>
        </header>

        {/* [Tech Stack Grid - 4 Columns] */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-xl flex flex-col justify-between"
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-neonPink/10 dark:bg-chartreuse/10 border border-neonPink/20 dark:border-chartreuse/20 text-neonPink dark:text-chartreuse">
                    {item.name}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* [Section 1: Civic Tech Objective] */}
        <section className="mb-16">
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-neonPink dark:text-chartreuse font-bold">&gt;</span> The Barangay Problem
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              Komunikonek was engineered to digitize and streamline local governance. It serves as a centralized, real-time mobile communication hub for barangay residents, transforming slow, paper-based local administration into an accessible digital dashboard.
            </p>
          </div>
        </section>

        {/* [Section 2: Core UX & Features (3-column card layout)] */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((card, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/15 hover:border-neonPink dark:hover:border-chartreuse transition-all duration-300 flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-neonPink dark:text-chartreuse">
                      0{idx + 1}.
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {card.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* [Section 3: Mobile Interface Gallery] */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-neonPink dark:text-chartreuse font-bold">&gt;</span> Mobile Interface Walkthrough
          </h2>

          {/* 3-column responsive placeholder grid for 9:16 mobile screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {screenshotPlaceholders.map((screen, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center"
              >
                <div className="w-full aspect-[9/16] rounded-2xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 backdrop-blur-2xl p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-neonPink dark:hover:border-chartreuse transition-all duration-300">
                  {/* Smartphone Top Notch / Speaker Grill */}
                  <div className="w-full flex justify-center">
                    <div className="w-20 h-1.5 rounded-full bg-slate-300 dark:bg-white/10" />
                  </div>

                  {/* Mobile Screen Placement Body */}
                  <div className="w-full flex-grow my-4 rounded-xl border border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center bg-black/[0.02] dark:bg-black/20">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neonPink/10 dark:bg-chartreuse/10 text-neonPink dark:text-chartreuse border border-neonPink/20 dark:border-chartreuse/20 mb-3">
                      Screen {screen.screenNumber}
                    </span>
                    <p className="font-mono text-sm font-bold text-slate-900 dark:text-white mb-2">
                      {screen.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">
                      {screen.description}
                    </p>
                    <span className="mt-4 font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      9:16 Mobile UI Screenshot
                    </span>
                  </div>

                  {/* Smartphone Bottom Home Bar */}
                  <div className="w-full flex justify-center">
                    <div className="w-16 h-1 rounded-full bg-slate-300 dark:bg-white/10" />
                  </div>
                </div>

                {/* Technical Caption */}
                <p className="mt-3 text-xs font-mono text-slate-500 dark:text-slate-400 text-center px-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">UI Screen {screen.screenNumber}:</span> {screen.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
