import type { MetadataRoute } from "next";

import { POSTS } from "@/app/(menu)/blog/posts";
import { absoluteUrl, toIsoDate } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: {
  path: string;
  changeFrequency: Entry["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/enterprise", changeFrequency: "monthly", priority: 0.8 },
  { path: "/api-documentation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/security", changeFrequency: "monthly", priority: 0.6 },
  { path: "/help", changeFrequency: "monthly", priority: 0.6 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/press", changeFrequency: "monthly", priority: 0.5 },
  { path: "/register", changeFrequency: "yearly", priority: 0.5 },
  { path: "/login", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: toIsoDate(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
