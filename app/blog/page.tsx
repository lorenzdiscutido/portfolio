import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export default function BlogPage() {
  return (
    <main className="bg-base min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Technical <span className="text-blue-600 dark:text-blue-400">Blog</span>
          </h1>
          <div className="h-1 w-20 bg-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-surface rounded-xl p-8 border border-transparent hover:border-orange transition-colors duration-300 flex flex-col"
            >
              <p className="text-orange-700 dark:text-orange text-xs font-semibold tracking-widest uppercase mb-2">
                {post.date}
              </p>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {post.title}
              </h2>
              <p className="text-muted leading-relaxed mb-8 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs font-semibold text-primary bg-base px-3 py-1 rounded-full border border-[#2d313a]"
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
