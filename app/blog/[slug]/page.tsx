import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blogData";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Jose Lorenzo Discutido`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-16 md:py-24 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold font-mono text-slate-600 dark:text-slate-400 hover:text-neonPink dark:hover:text-chartreuse transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-neonPink dark:text-chartreuse text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase">
              {post.date}
            </p>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-md border border-black/10 dark:border-white/15"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-8">
          {post.sections.map((section, idx) => (
            <section
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-2xl space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono">
                {section.heading}
              </h2>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {section.codeSnippet && (
                <div className="mt-4 bg-slate-950 text-slate-100 rounded-lg border border-black/20 dark:border-white/10 p-4 overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 pb-2 border-b border-white/10">
                    <span className="text-emerald-400 font-semibold">
                      // {section.codeSnippet.label}
                    </span>
                    <span className="text-neonPink dark:text-chartreuse font-mono">config</span>
                  </div>
                  <pre className="font-mono text-xs leading-relaxed text-slate-200">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-black/10 dark:border-white/15 flex justify-between items-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-slate-600 dark:text-slate-400 hover:text-neonPink dark:hover:text-chartreuse transition-colors"
          >
            ← All Articles
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-neonPink dark:text-chartreuse hover:underline transition-colors"
          >
            Discuss this architecture →
          </Link>
        </footer>
      </article>
    </main>
  );
}
