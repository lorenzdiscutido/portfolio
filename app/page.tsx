import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Workspace from "@/components/Workspace";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-900 dark:text-slate-100 selection:bg-neonPink dark:selection:bg-chartreuse selection:text-white dark:selection:text-midnight">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Workspace />
      <Footer />
    </main>
  );
}
