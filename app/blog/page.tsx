import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blogData";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technical Blog",
  description:
    "Engineering articles on distributed MySQL GTID replication, zero-trust Tailscale WireGuard meshes, and multimodal Gemini AI automation pipelines.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold font-mono text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
        </Link>

        <div className="mb-12 text-left">
          <p className="text-orange-700 dark:text-orange font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm font-mono">
            Engineering Dispatches
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical <span className="text-blue-600 dark:text-blue-400">Blog</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange transition-all duration-300 flex flex-col shadow-lg group"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-orange-700 dark:text-orange text-xs font-mono font-semibold tracking-widest uppercase">
                  {post.date}
                </p>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="font-mono text-xs font-medium text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-black/10 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
