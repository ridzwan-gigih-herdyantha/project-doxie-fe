import type { MetadataRoute } from "next";

import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Authenticated app screens and internal endpoints have no search value.
      disallow: [
        "/dashboard",
        "/documents",
        "/chats",
        "/settings",
        "/api/",
        "/auth/",
        "/broadcasting/",
        "/session-expired",
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
