import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ResumeDownload from "@/components/ResumeDownload";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0f1115]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-slate-900 dark:text-white font-extrabold text-xl tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          JLD
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#about"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/#experience"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:inline"
          >
            Experience
          </Link>
          <Link
            href="/#projects"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
          <div className="hidden md:block">
            <ResumeDownload />
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
