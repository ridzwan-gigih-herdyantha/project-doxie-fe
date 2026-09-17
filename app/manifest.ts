import type { MetadataRoute } from "next";

import { SITE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: SITE.logo, sizes: "any", type: "image/svg+xml" },
    ],
  };
}
