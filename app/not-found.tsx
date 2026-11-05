import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl p-10 shadow-lg">
        <p className="text-orange-700 dark:text-orange font-semibold tracking-widest uppercase mb-2 font-mono text-sm">
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
            className="inline-block px-6 py-3 rounded-lg bg-white dark:bg-[#1e2128] border border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange text-slate-900 dark:text-white font-medium transition-colors font-mono text-sm"
          >
            ← Return Home
          </Link>
          <Link
            href="/#projects"
            className="inline-block px-6 py-3 rounded-lg bg-orange text-black font-bold transition-opacity hover:opacity-90 font-mono text-sm"
          >
            View Case Studies
          </Link>
        </div>
      </div>
    </main>
  );
}
