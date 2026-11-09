import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center bg-[#1e2128]/80 backdrop-blur-md border border-white/5 rounded-2xl p-10 shadow-none">
        <p className="text-[#FF7A00] font-semibold tracking-widest uppercase mb-2 font-mono text-sm">
          HTTP 404 // ROUTE NOT FOUND
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] mb-4">
          Resource Not Located
        </h1>
        <p className="text-[#94a3b8] leading-relaxed mb-8 text-sm sm:text-base">
          The requested path or engineering document does not exist in the system index.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-[#1e2128] border border-white/5 hover:border-[#0052FF]/50 text-[#f8fafc] font-semibold transition-all font-mono text-sm shadow-none"
          >
            ← Return Home
          </Link>
          <Link
            href="/#projects"
            className="inline-block px-6 py-3 rounded-full bg-[#0052FF] text-[#f8fafc] font-bold transition-all hover:bg-[#0052FF]/90 font-mono text-sm shadow-none hover:scale-[1.02] active:scale-[0.98]"
          >
            View Case Studies
          </Link>
        </div>
      </div>
    </main>
  );
}
