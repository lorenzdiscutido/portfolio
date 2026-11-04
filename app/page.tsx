import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-base min-h-screen text-primary selection:bg-blue selection:text-primary">
      <Hero />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}
