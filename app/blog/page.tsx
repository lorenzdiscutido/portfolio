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
          className="inline-flex items-center gap-2 text-sm font-semibold font-mono text-[#94a3b8] hover:text-[#0052FF] transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
        </Link>

        <div className="mb-12 text-left">
          <p className="text-[#0052FF] font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm font-mono">
            Engineering Dispatches
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight">
            Technical <span className="text-[#0052FF]">Blog</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-[#1e2128]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-[#0052FF]/50 transition-all duration-300 flex flex-col shadow-none group"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-[#0052FF] text-xs font-mono font-semibold tracking-widest uppercase">
                  {post.date}
                </p>
                <span className="text-xs font-mono text-[#94a3b8]">
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#f8fafc] mb-4 group-hover:text-[#0052FF] transition-colors">
                {post.title}
              </h2>

              <p className="text-[#94a3b8] leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="font-mono text-xs font-medium text-[#f8fafc] bg-[#1e2128] px-3 py-1 rounded-full border border-white/5"
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
