import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="bg-base min-h-screen text-primary flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-orange-700 dark:text-orange font-semibold tracking-wide uppercase mb-2">
            Error 404
          </p>
          <h1 className="text-4xl font-extrabold text-primary mb-4">
            Article Not Found
          </h1>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-lg bg-surface border border-[#2d313a] hover:border-orange text-primary font-medium transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-base min-h-screen py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-block text-muted hover:text-blue transition-colors mb-8"
        >
          ← Back to Blog
        </Link>

        <p className="text-orange-700 dark:text-orange text-sm font-semibold tracking-widest uppercase mb-2">
          {post.date}
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-semibold text-primary bg-surface px-3 py-1 rounded-full border border-[#2d313a]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-6 text-muted text-lg leading-relaxed">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
