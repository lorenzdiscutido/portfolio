import Link from "next/link";
import { caseStudies } from "@/lib/caseStudyData";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

export function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return (
      <div className="bg-base min-h-screen text-primary flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-orange font-semibold tracking-wide uppercase mb-2">
            Error 404
          </p>
          <h1 className="text-4xl font-extrabold text-primary mb-4">
            Case Study Not Found
          </h1>
          <p className="text-muted leading-relaxed mb-8">
            The requested engineering case study could not be located in the system index.
          </p>
          <Link
            href="/#projects"
            className="inline-block px-6 py-3 rounded-lg bg-surface border border-[#2d313a] hover:border-orange text-primary font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link
          href="/#projects"
          className="inline-block text-muted hover:text-primary transition-colors mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-extrabold text-primary mb-2">
          {study.title}
        </h1>
        <p className="text-orange font-semibold tracking-wide uppercase mb-8">
          {study.role}
        </p>

        <p className="text-lg text-muted leading-relaxed mb-12">
          {study.overview}
        </p>

        <ArchitectureDiagram slug={study.slug} />

        <p className="text-muted leading-relaxed">
          {study.architectureDetails}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Technical <span className="text-blue">Stack</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {study.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-surface border border-[#2d313a] text-primary px-4 py-2 rounded-md text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Key <span className="text-blue">Outcomes</span>
            </h2>
            <ul className="space-y-4">
              {study.outcomes.map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-muted leading-relaxed"
                >
                  <span className="mt-2.5 h-2 w-2 rounded-full bg-blue shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
