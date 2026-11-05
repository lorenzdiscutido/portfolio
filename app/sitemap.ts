import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { blogPosts } from "@/lib/blogData";
import { caseStudies } from "@/lib/caseStudyData";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}/projects/${study.slug}`,
    lastModified: new Date(study.lastModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...projectRoutes,
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date("2024-11-02"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogRoutes,
  ];
}
