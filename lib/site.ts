const DEFAULT_SITE_URL = "https://portfolio-eosin-xi-16.vercel.app";

/**
 * Canonical site URL used for metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the custom domain is live
 * (MASTER_PLAYBOOK Module 13) - no code change needed.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, "");
