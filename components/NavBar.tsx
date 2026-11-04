import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-base/90 backdrop-blur border-b border-[#2d313a] transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-primary font-extrabold text-lg tracking-tight hover:text-blue transition-colors"
        >
          JLD<span className="text-orange">.sys</span>
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="/#about"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="/#projects"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            Projects
          </a>
          <a
            href="/#workspace"
            className="text-sm font-medium text-muted hover:text-primary transition-colors hidden sm:inline"
          >
            Workspace
          </a>
          <a
            href="/#contact"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
