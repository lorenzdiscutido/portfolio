import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-2xl p-10 shadow-none">
        <p className="text-[#FF7A00] font-semibold tracking-widest uppercase mb-2 font-mono text-sm">
          HTTP 404 // ROUTE NOT FOUND
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4 font-sans">
          Resource Not Located
        </h1>
        <p className="text-muted leading-relaxed mb-8 text-sm sm:text-base font-sans">
          The requested path or engineering document does not exist in the system index.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-surface/80 border border-black/10 dark:border-white/5 hover:border-[#0052FF]/50 text-primary font-semibold transition-colors duration-200 font-mono text-sm shadow-none"
          >
            ← Return Home
          </Link>
          <Link
            href="/#projects"
            className="inline-block px-6 py-3 rounded-full bg-[#0052FF] text-white font-bold transition-colors duration-200 hover:bg-[#0052FF]/90 font-mono text-sm shadow-none"
          >
            View Case Studies
          </Link>
        </div>
      </div>
    </main>
  );
}
