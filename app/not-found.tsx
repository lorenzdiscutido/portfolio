import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/15 rounded-2xl p-10 shadow-2xl">
        <p className="text-neonPink dark:text-chartreuse font-semibold tracking-widest uppercase mb-2 font-mono text-sm">
          HTTP 404 // Route Not Found
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          Resource Not Located
        </h1>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-sm sm:text-base">
          The requested path or engineering document does not exist in the system index.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/15 hover:border-neonPink dark:hover:border-chartreuse text-slate-900 dark:text-white font-medium transition-all font-mono text-sm shadow-sm"
          >
            ← Return Home
          </Link>
          <Link
            href="/#projects"
            className="inline-block px-6 py-3 rounded-full bg-neonPink dark:bg-chartreuse text-white dark:text-midnight font-bold transition-all hover:scale-[1.02] active:scale-[0.98] font-mono text-sm shadow-lg hover:shadow-neonPink/25 dark:hover:shadow-chartreuse/25"
          >
            View Case Studies
          </Link>
        </div>
      </div>
    </main>
  );
}
